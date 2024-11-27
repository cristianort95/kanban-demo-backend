import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {UserAuth} from "../domain/UserAuth";


export class AuthMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        const token = (req.header("Authorization") ?? "").split(' ')[1];
        if (token) {
            try {
                req.userAuth = jwt.verify(token, process.env.SECRET_KEY || "") as UserAuth;
                return next();
            } catch(err) {
                res.status(403).json({ error: 'Invalid credentials' });
            }
        } else
            res.status(403).json({ error: 'Token invalid.' });
    }
}