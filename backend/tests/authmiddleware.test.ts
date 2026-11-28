import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../src/utils/AppError";

const { findByPkMock } = vi.hoisted(() => ({ findByPkMock: vi.fn() }));

vi.mock("../src/models/User", () => ({
  default: {
    findByPk: findByPkMock,
  },
}));

type VerifyToken = typeof import("../src/middleware/authmiddleware")["verifyToken"];

describe("verifyToken", () => {
  let verifyToken: VerifyToken;

  beforeAll(async () => {
    process.env.JWT_SECRET = "test-access-secret";
    verifyToken = (await import("../src/middleware/authmiddleware")).verifyToken;
  });

  beforeEach(() => {
    findByPkMock.mockReset();
    findByPkMock.mockResolvedValue(null);
  });

  const tokenFor = (
    id: number,
    tokenVersion: number,
    secret = "test-access-secret",
  ) =>
    jwt.sign(
      { id, email: "user@example.com", tokenVersion },
      secret,
      { expiresIn: "60m" },
    );

  const invoke = async (authorization?: string) => {
    const req = {
      headers: authorization ? { authorization } : {},
    } as unknown as Request;
    const next = vi.fn() as unknown as NextFunction;

    await verifyToken(req, {} as Response, next);

    return { req, next };
  };

  it("accepts a token whose version matches the user", async () => {
    findByPkMock.mockResolvedValue({ id: 7, tokenVersion: 2 });

    const { req, next } = await invoke(
      `Bearer ${tokenFor(7, 2)}`,
    );

    expect(findByPkMock).toHaveBeenCalledWith(7, {
      attributes: ["id", "tokenVersion"],
    });
    expect(req.user).toMatchObject({ id: 7, tokenVersion: 2 });
    expect(next).toHaveBeenCalledWith();
  });

  it("rejects a token from an ended session", async () => {
    findByPkMock.mockResolvedValue({ id: 7, tokenVersion: 1 });

    const { next } = await invoke(`Bearer ${tokenFor(7, 2)}`);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });

  it("rejects an invalid signature without querying the database", async () => {
    const { next } = await invoke(
      `Bearer ${tokenFor(7, 0, "wrong-secret")}`,
    );

    expect(findByPkMock).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });

  it("rejects a request with no token", async () => {
    const { next } = await invoke();

    expect(findByPkMock).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
