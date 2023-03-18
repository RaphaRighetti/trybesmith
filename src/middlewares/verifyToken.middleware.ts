import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../auth/jwt';

interface CustomRequest extends Request {
  payload: string | JwtPayload
}

export default async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;
  try {
    const payload = verifyToken(token as string);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(201).json({ message: 'efetue login para continuar' });
  }
};