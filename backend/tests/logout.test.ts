import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { AuthMessageResponse } from "../src/types/ResponseTypes";

const { updateMock } = vi.hoisted(() => ({ updateMock: vi.fn() }));

vi.mock("../src/models/User", () => ({
  default: {
    update: updateMock,
  },
}));

type LogoutController = typeof import("../src/controllers/authcontrollers")["logoutUser"];

describe("logoutUser", () => {
  let logoutUser: LogoutController;

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-access-secret";
    process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
    logoutUser = (await import("../src/controllers/authcontrollers")).logoutUser;
  });

  beforeEach(() => {
    updateMock.mockReset();
    updateMock.mockResolvedValue([1]);
  });

  const refreshTokenFor = (id: number, expiresIn: string | number = "7d") =>
    jwt.sign({ id, email: "user@example.com" }, "test-refresh-secret", {
      expiresIn,
    });

  const accessTokenFor = (id: number) =>
    jwt.sign({ id, email: "user@example.com" }, "test-access-secret", {
      expiresIn: "60m",
    });

  const setup = () => {
    const res = {
      clearCookie: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn() as unknown as NextFunction;
    return { res, next };
  };

  const invoke = async (
    req: { cookies?: Record<string, string>; headers?: Record<string, string> },
    res: unknown,
    next: NextFunction,
  ) => {
    await logoutUser(
      {
        headers: {},
        ...req,
      } as unknown as Request,
      res as Response<AuthMessageResponse>,
      next,
    );
  };

  it("revokes the user even when the cookie no longer matches the stored token", async () => {
    const { res, next } = setup();

    await invoke(
      { cookies: { refreshToken: refreshTokenFor(7) } },
      res,
      next,
    );

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null },
      { where: { id: 7 } },
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.clearCookie).toHaveBeenCalledWith(
      "refreshToken",
      expect.any(Object),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("revokes by access token when no refresh cookie is sent", async () => {
    const { res, next } = setup();

    await invoke(
      {
        cookies: {},
        headers: { authorization: `Bearer ${accessTokenFor(9)}` },
      },
      res,
      next,
    );

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null },
      { where: { id: 9 } },
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("still identifies the user from an expired refresh token", async () => {
    const { res, next } = setup();

    await invoke(
      { cookies: { refreshToken: refreshTokenFor(11, -1) } },
      res,
      next,
    );

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null },
      { where: { id: 11 } },
    );
  });

  it("clears the cookie and reports success when no identity is available", async () => {
    const { res, next } = setup();

    await invoke({ cookies: {} }, res, next);

    expect(updateMock).not.toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("clears the cookie and forwards database errors", async () => {
    const error = new Error("database unavailable");
    updateMock.mockRejectedValueOnce(error);
    const { res, next } = setup();

    await invoke(
      { cookies: { refreshToken: refreshTokenFor(13) } },
      res,
      next,
    );

    expect(res.clearCookie).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});
