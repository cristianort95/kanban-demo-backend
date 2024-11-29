import {NextFunction, Request, Response} from "express";
import {TaskService} from "../application/task-service";


export class TaskController {
    constructor(readonly service: TaskService) {}

    async post(req: Request, res: Response, _next: NextFunction) {
        const body = req.body;
        try {
            body.userId = req.userAuth!.id;
            body.projectId = Number(req.params.projectId ?? 0);
            const response = await this.service.create(body)
            res.setHeader(
                'Content-Type', 'application/json'
            ).status(response.statusCode).send({...response});
        } catch (err) {
            console.error('Error al registrar usuario:', err);
        }
    }

    async patch(req: Request, res: Response, _next: NextFunction) {
        const body = req.body;
        const response = await this.service.update(
            Number(req.params.id ?? 0),
            body,
            Number(req.userAuth!.id),
            Number(req.params.projectId ?? 0)
        )
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async get(req: Request, res: Response, _next: NextFunction) {
        const id = Number(req.params.id ?? 0);
        const projectId = Number(req.params.projectId ?? 0);
        const response = await this.service.get(id, projectId)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async getAll(req: Request, res: Response, _next: NextFunction) {
        const projectId = Number(req.params.projectId ?? 1);
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 5);
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
        const response = await this.service.getAll(limit * (page - 1), limit, include, {projectId})
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const projectId = Number(req.params.projectId ?? 1);
        const id = Number(req.params.id ?? 1);
        const response = await this.service.delete(
            id,
            Number(req.userAuth!.id),
            projectId)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

}