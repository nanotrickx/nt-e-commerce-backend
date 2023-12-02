import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { FirebaseApp } from './firebase.service';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;

  constructor(private firebaseApp: FirebaseApp) {
    this.auth = this.firebaseApp.getAuth();
  }

  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.auth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          req['user'] = {
            email: decodedToken.email,
            roles: (decodedToken.roles || []),
            type: decodedToken.type,
          };
          next();
        })
        .catch(() => {
          PreAuthMiddleware.accessDenied("Invalid token", res);
        });
    } else {
      PreAuthMiddleware.accessDenied("Authorization token not found", res);
    }
  }

  private static accessDenied(message: string, res: Response) {
    res.status(401).json({
      statusCode: 401,
      error: 'unauthorized',
      messages: message,
    });
  }
}