import {NextFunction, Request, Response} from "express";

import {GenericPrismaService} from "../application/generic-prisma-service";

export class GenericController {
    models = [
        {model: 'user', path: '/users'},
        {model: 'user', path: '/auth'},
        {model: 'project', path: '/projects'},
        {model: 'role', path: '/roles'},
        {model: 'task', path: '/tasks'},
        {model: 'comment', path: '/comments'}
    ]

    constructor(readonly service: GenericPrismaService) {}

    async getAll(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));
        const page = Number(req.params.page ?? 1);
        const limit = Number(req.params.limit ?? 5);
        const include: any = {};
        const relations = String(req.query.relations ?? "").split(",");

        relations.forEach((relation: string) => {
            if (relation != '') {
                const select: any = req.query[relation] ? {} : false
                const selectData = String(req.query[relation] ?? "").split(",").map((data: string) => {
                    if (data != '') select[data] = true
                });
                if (selectData.length > 0) {
                    include[relation] = select ? {select} : true
                } else include[relation] = true
            }
        });
        const response = await this.service.getAll(limit * (page - 1), limit, include, model)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async get(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));
        const id = Number(req.params.id ?? 0);
        const response = await this.service.get({id}, model)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async post(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));
        const response = await this.service.create(req.body, model)
        res.setHeader(
            'Content-Type', ''
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async patch(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));
        const id = Number(req.params.id ?? 0);
        const response = await this.service.update({id}, req.body, model)

        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const model: string = String(this.getModel(req.originalUrl));
        const id = Number(req.params.id ?? 0);
        const response = await this.service.delete({id}, model)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    protected getModel = (path: String): String => {
        const model = this.models.find(i => path.includes(i.path));
        if (model) return model.model;
        else return 'notModel'
    }
}