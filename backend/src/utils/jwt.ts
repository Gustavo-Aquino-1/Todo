import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || '';

const createToken = (payload: any) => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '15m',
  });
};

const decode = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

export { createToken, decode };
