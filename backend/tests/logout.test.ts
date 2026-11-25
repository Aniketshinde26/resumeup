import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { literal } from "sequelize";
import type { AuthMessageResponse } from "../src/types/ResponseTypes";

const { updateMock, findByPkMock } = vi.hoisted(() => ({
  updateMock: vi.fn(),
  findByPkMock: vi.fn(),
}));

vi.mock("../src/models/User", () => ({
  default: {
    update: updateMock,
    findByPk: findByPkMock,
  },
}));

type LogoutController = typeof import("../src/controllers/authcontrollers")["logoutUser"];

describe("logoutUser", () => {
  let logoutUser: LogoutController;

  const revokedUpdate = () => [
    { refreshToken: null, tokenVersion: literal("tokenVersion + 1") },
    expect.any(Object),
  ];

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-access-secret";
    process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
    logoutUser = (await import("../src/controllers/authcontrollers")).logoutUser;
  });

  beforeEach(() => {
    updateMock.mockReset();
    findByPkMock.mockReset();
    updateMock.mockResolvedValue([1]);
    findByPkMock.mockResolvedValue(null);
  });

  const refreshTokenFor = (
    id: number,
    tokenVersion = 0,
    expiresIn: string | number = "7d",
  ) =>
    jwt.sign(
      { id, email: "user@example.com", tokenVersion },
      "test-refresh-secret",
      { expiresIn },
    );

  const accessTokenFor = (id: number, tokenVersion = 0) =>
    jwt.sign(
      { id, email: "user@example.com", tokenVersion },
      "test-access-secret",
      { expiresIn: "60m" },
    );

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

  it("revokes by access token and invalidates older tokens", async () => {
    const { res, next } = setup();

    await invoke(
      {
        headers: {
          authorization: `Bearer ${accessTokenFor(7, 2)}`,
        },
      },
      res,
      next,
    );

    expect(updateMock).toHaveBeenCalledWith(...revokedUpdate());
    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null, tokenVersion: literal("tokenVersion + 1") },
      { where: { id: 7, tokenVersion: 2 } },
    );
    expect(findByPkMock).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.clearCookie).toHaveBeenCalledWith(
      "refreshToken",
      expect.any(Object),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("revokes by matching refresh cookie when no access token is sent", async () => {
    const { res, next } = setup();
    const refreshToken = refreshTokenFor(9, 1);
    findByPkMock.mockResolvedValue({
      id: 9,
      refreshToken,
      tokenVersion: 1,
    });

    await invoke({ cookies: { refreshToken } }, res, next);

    expect(findByPkMock).toHaveBeenCalledWith(9);
    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null, tokenVersion: literal("tokenVersion + 1") },
      { where: { id: 9, tokenVersion: 1 } },
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("does not revoke when the refresh cookie no longer matches the stored token", async () => {
    const { res, next } = setup();
    const refreshToken = refreshTokenFor(11);
    findByPkMock.mockResolvedValue({
      id: 11,
      refreshToken: "a-different-stored-token",
      tokenVersion: 0,
    });

    await invoke({ cookies: { refreshToken } }, res, next);

    expect(updateMock).not.toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  });

  it("still revokes from an expired refresh token", async () => {
    const { res, next } = setup();
    const refreshToken = refreshTokenFor(13, 0, -1);
    findByPkMock.mockResolvedValue({
      id: 13,
      refreshToken,
      tokenVersion: 0,
    });

    await invoke({ cookies: { refreshToken } }, res, next);

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null, tokenVersion: literal("tokenVersion + 1") },
      { where: { id: 13, tokenVersion: 0 } },
    );
  });

  it("clears the cookie and reports success when no identity is available", async () => {
    const { res, next } = setup();

    await invoke({ cookies: {} }, res, next);

    expect(findByPkMock).not.toHaveBeenCalled();
    expect(updateMock).not.toHaveBeenCalled();
    expect(res.clearCookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("reports success when the token version is already stale", async () => {
    const { res, next } = setup();
    updateMock.mockResolvedValueOnce([0]);

    await invoke(
      {
        headers: {
          authorization: `Bearer ${accessTokenFor(15, 3)}`,
        },
      },
      res,
      next,
    );

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null, tokenVersion: literal("tokenVersion + 1") },
      { where: { id: 15, tokenVersion: 3 } },
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("clears the cookie and forwards database errors", async () => {
    const error = new Error("database unavailable");
    updateMock.mockRejectedValueOnce(error);
    const { res, next } = setup();

    await invoke(
      {
        headers: {
          authorization: `Bearer ${accessTokenFor(17)}`,
        },
      },
      res,
      next,
    );

    expect(res.clearCookie).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
  });
});
