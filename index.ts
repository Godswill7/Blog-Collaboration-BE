import express, { Application } from "express";

const port: number = 1111;

const app: Application = express();

const server = app.listen(() => {
  console.log("");
  console.log("Server is up and listening", port);
});

process.on("uncaughtException", (error: Error) => {
  console.log("Server is shutting down due to uncaughtException", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("Server is shutting down due to unhandledRejection", reason);
  server.close(() => {
    process.exit(1);
  });
});
