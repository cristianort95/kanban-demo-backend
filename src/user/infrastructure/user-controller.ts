import {NextFunction, Request, Response} from "express";
import {GenericController} from "../../core/infrastructure/generic-controller";
import {GenericPrismaService} from "../../core/application/generic-prisma-service";
import {PasswordValidationService} from "../application/PasswordValidationService";


export class UserController extends GenericController {

    constructor(
        readonly service: GenericPrismaService,
        readonly passwordSvc: PasswordValidationService,
    ) {super(service);}

    async post(req: Request, res: Response, _next: NextFunction) {
        const body = req.body;
        try {
            body.password = await this.passwordSvc.validateAndHash(body.password);
            console.log("body.password", body.password)
            const response = await this.service.create(body, "user")
            res.setHeader(
                'Content-Type', 'application/json'
            ).status(response.statusCode).send({ msg: response.message});
        } catch (err) {
            console.error('Error al registrar usuario:', err);
        }
    }


    async patch(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));

        if (req.body.password)
            req.body.password = await this.passwordSvc.validateAndHash(req.body.password);

        const response = await this.service.update({id: req.userAuth?.id}, req.body, model)

        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async get(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));
        const response = await this.service.get({id: req.userAuth?.id}, model)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));
        const response = await this.service.delete({id: req.userAuth?.id}, model)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

}