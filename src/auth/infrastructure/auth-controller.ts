import {GenericController} from "../../core/infrastructure/generic-controller";
import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthController extends GenericController {

    async login(req: Request, res: Response, _next: NextFunction) {
        const secretKey = process.env.SECRET_KEY || "";
        const body = req.body;
        if (body.username && body.password) {
            const user = await this.service.get({username: body.username,}, "user", { password:false })

            try {
                const match = await bcrypt.compare(body.password, user.data?.password ?? "");
                if (match && body.username === user.data.username) {
                    delete user.data.password;
                    const payload = {
                        ...user.data, routes: user.data?.role ?? null,
                    }
                    const token = jwt.sign(payload, secretKey, { expiresIn: '8h' });

                    res.setHeader(
                        'Content-Type', 'application/json'
                    ).status(200).json({ jwt: token });
                } else {
                    res.status(401).json({ error: 'User or password invalid.' });
                }
            } catch (err) {
                console.error('Error in auth user:', err);
                res.status(500).json({ error: 'Error in auth user.' });
            }
        } else res.status(401).json({ error: 'User or password.' });
    }
}