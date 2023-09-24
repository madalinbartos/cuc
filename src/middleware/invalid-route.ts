import { Request, Response } from "express";

export const invalidRoute = (req: Request, res: Response) => {
  res.status(404).json({ message: "Invalid route" });
};
