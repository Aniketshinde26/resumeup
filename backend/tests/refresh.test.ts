import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import crypto from "crypto";
import { literal } from "sequelize";
import { ForbiddenError, UnauthorizedError } from "../src/utils/AppError";
import type { RefreshTokenResponse } from "../src/types/ResponseTypes";

const { findByPkMock, updateMock } = vi.hoisted(() => ({
  findByPkMock: vi.fn(),
  updateMock: vi.fn(),
}));

vi.mock("../src/models/User", () => ({
  default: {
    findByPk: findByPkMock,
    update: updateMock,
  },
}));

type RefreshController =
  (typeof import("../src/controllers/authcontrollers"))["refreshAccessToken"];

describe("refreshAccessToken", () => {
  let refreshAccessToken: RefreshController;

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-access-secret";
    process.env.JWT_REFRESH_SECRET = "test-refresh-secret";
    refreshAccessToken = (await import("../src/controllers/authcontrollers"))
      .refreshAccessToken;
  });

  beforeEach(() => {
    findByPkMock.mockReset();
    updateMock.mockReset();
    updateMock.mockResolvedValue([1]);
  });

  const refreshTokenFor = (
    id: number,
    tokenVersion = 0,
    expiresIn: SignOptions["expiresIn"] = "7d",
  ) =>
    jwt.sign(
      { id, email: "user@example.com", tokenVersion },
      "test-refresh-secret",
      {
        expiresIn,
        jwtid: crypto.randomBytes(16).toString("hex"),
      },
    );

  const userFor = (refreshToken: string, tokenVersion: number) => ({
    id: 7,
    email: "user@example.com",
    fullname: "Test User",
    refreshToken,
    tokenVersion,
    get: vi.fn(() => ({
      id: 7,
      email: "user@example.com",
      fullname: "Test User",
      refreshToken,
      tokenVersion,
    })),
  });

  const setup = () => {
    const res = {
      cookie: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    const next = vi.fn() as unknown as NextFunction;
    return { res, next };
  };

  const invoke = async (
    cookies: Record<string, string>,
    res: unknown,
    next: NextFunction,
  ) => {
    await refreshAccessToken(
      { cookies } as unknown as Request,
      res as Response<RefreshTokenResponse>,
      next,
    );
  };

  it("rotates the refresh token and returns a new access token", async () => {
    const { res, next } = setup();
    const oldRefreshToken = refreshTokenFor(7, 2);
    findByPkMock.mockResolvedValue(userFor(oldRefreshToken, 2));

    await invoke({ refreshToken: oldRefreshToken }, res, next);

    const newRefreshToken = res.cookie.mock.calls[0][1] as string;
    expect(newRefreshToken).not.toBe(oldRefreshToken);
    expect(jwt.verify(newRefreshToken, "test-refresh-secret")).toMatchObject({
      id: 7,
      tokenVersion: 2,
    });

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: newRefreshToken },
      { where: { id: 7, refreshToken: oldRefreshToken, tokenVersion: 2 } },
    );
    expect(res.cookie).toHaveBeenCalledWith(
      "refreshToken",
      newRefreshToken,
      expect.any(Object),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  });

  it("revokes all sessions when a previous refresh token is reused", async () => {
    const { res, next } = setup();
    const oldRefreshToken = refreshTokenFor(7, 2);
    findByPkMock.mockResolvedValue(userFor(refreshTokenFor(7, 2), 2));

    await invoke({ refreshToken: oldRefreshToken }, res, next);

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null, tokenVersion: literal("tokenVersion + 1") },
      { where: { id: 7 } },
    );
    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    expect(res.cookie).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects a refresh token with a stale token version", async () => {
    const { res, next } = setup();
    const refreshToken = refreshTokenFor(7, 1);
    findByPkMock.mockResolvedValue(userFor(refreshToken, 2));

    await invoke({ refreshToken }, res, next);

    expect(updateMock).toHaveBeenCalledWith(
      { refreshToken: null, tokenVersion: literal("tokenVersion + 1") },
      { where: { id: 7 } },
    );
    expect(next).toHaveBeenCalledWith(expect.any(ForbiddenError));
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects a request with no refresh cookie", async () => {
    const { res, next } = setup();

    await invoke({}, res, next);

    expect(findByPkMock).not.toHaveBeenCalled();
    expect(updateMock).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    expect(res.status).not.toHaveBeenCalled();
  });
});
