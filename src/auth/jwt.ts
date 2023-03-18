import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (payload: JwtPayload): string => {
  const options = { algorithm: 'HS256', expiresIn: '7d' };
  const token: string = jwt.sign(payload, process.env.JWT_SECRET as string, options as SignOptions);
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    return payload;
  } catch (err) {
    return 'faça login para prosseguir';
  }
};