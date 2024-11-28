import {NextFunction, Request, Response} from "express";
import {GenericController} from "../../core/infrastructure/generic-controller";
import {ProjectService} from "../application/ProjectService";


export class ProjectController extends GenericController {
    constructor(readonly service: ProjectService) {
        super(service);
    }

    async post(req: Request, res: Response, _next: NextFunction) {
        const body = req.body;
        try {
            const response = await this.service.createProject(
                body.name,
                body.description,
                "admin",
                req.userAuth!,
            )
            res.setHeader(
                'Content-Type', 'application/json'
            ).status(response.statusCode).send({...response});
        } catch (err) {
            console.error('Error al registrar usuario:', err);
        }
    }


    async patch(req: Request, res: Response, _next: NextFunction) {
        const id = Number(req.params.id);
        const response = await this.service.updateProject({id, userId: req.userAuth?.id, role: "admin"}, req.body)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async get(req: Request, res: Response, _next: NextFunction) {
        const id = Number(req.params.id);
        const include = {
            project: { select: { name: true, description: true }},
        }
        const response = await this.service.get({id, userId: req.userAuth?.id, role: "admin"}, "role", undefined, include)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async getAll(req: Request, res: Response, _next: NextFunction) {
        const page = Number((req.query.page==='0' ? 1 : req.query.page) ?? 1);
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
        const response = await this.service.getAll(limit * (page - 1), limit, include, 'role', {userId: req.userAuth?.id, role: "admin"})
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const id = Number(req.params.id);
        const response = await this.service.deleteProject({id, userId: req.userAuth?.id, role: "admin"})
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

}