import { Request, Response, NextFunction } from 'express';

// Este middleware envuelve cualquier función de controlador asíncrona
export const asyncHandler = (fn: Function) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };