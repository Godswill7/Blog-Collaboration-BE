import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { HTTP, mainError } from "./error/mainError";
// import users from "./router/userRouter";
import { errorHandler } from "./error/errorHandler";

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "UPDATE"],
    })
  );
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(HTTP.OK).json({
        message: "Welcome Home",
      });
    } catch (error) {
      console.log(error);
    }
  });
//   app.use("/api/v1/", users);

  app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(
      new mainError({
        name: "Route Invalid",
        message: `This is coming from the invalid route ${req.originalUrl}`,
        status: HTTP.BAD,
        success: false,
      })
    );
  });
  app.use(errorHandler);
};
