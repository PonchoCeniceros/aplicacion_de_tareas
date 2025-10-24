import dotenv from 'dotenv';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Role } from '../domain/role';
import { Request, Response, NextFunction } from 'express';

// cargar variables de entorno desde .env
dotenv.config();

/**
 *
 */
const secretKey = process.env.SECRET_KEY!;

/**
 *
 */
export function authMiddleware(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] || '';

    if (!token) {
      res.status(401).json({ message: 'Acceso denegado' });

    } else {
      jwt.verify(token, secretKey, (err, decoded: any) => {
        if (err) {
          if (err instanceof TokenExpiredError) {
            res.status(401).json({ message: 'Acceso denegado por expiración de token' });
          } else {
            res.status(403).json({ message: 'Acceso denegado' });
          }
        } else if (!roles.includes(decoded.role)) {
          res.status(403).json({ message: 'Acceso denegado' });
        } else {
          next();
        }
      });
    }
  }
}
