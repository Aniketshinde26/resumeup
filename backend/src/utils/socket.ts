import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import type { Application } from "express";

export const createSocketServer = (
  httpServer: HttpServer,
  corsOrigins: string[],
): Server =>
  new Server(httpServer, {
    cors: {
      origin: corsOrigins,
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

export const getSocketIO = (app: Application): Server | undefined =>
  app.get("socketio");
