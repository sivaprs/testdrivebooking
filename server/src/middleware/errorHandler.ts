import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import logger from "../utils/logger";

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  logger.error(err.message);
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
