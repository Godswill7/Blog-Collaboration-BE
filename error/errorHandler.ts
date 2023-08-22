import { NextFunction, Response } from "express";
import { HTTP, mainError } from "./mainError";

export const errFile = (err: mainError, res: Response) => {
  return res.status(HTTP.BAD).json({
    name: err.name,
    message: err.message,
    status: err.status,
    success: err.success,
    stack: err.stack,
  });
};

export const errorHandler = (err: any, res: Response, next: NextFunction) => {
  errFile(err, res);
};
