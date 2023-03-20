import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) throw new Error('Token not found');
    const payload = verifyToken(token as string);
    req.body = { ...req.body, payload };
    next();
  } catch (err) {
    const { message } = err as Error;
    const newMessage = message.includes('not found') ? message : 'Invalid token';
    res.status(401).json({ message: newMessage });
  }
};