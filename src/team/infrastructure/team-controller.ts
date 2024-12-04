import {NextFunction, Request, Response} from "express";
import {GenericController} from "../../core/infrastructure/generic-controller";
import {TeamService} from "../application/team-service";


export class TeamController extends GenericController {
    constructor(readonly service: TeamService) {
        super(service);
    }

    async post(req: Request, res: Response, _next: NextFunction) {
        const projectId = Number(req.params.projectId);
        const body = req.body;
        body.projectId = projectId;
        try {
            const response = await this.service.addMember(
                req.userAuth!.email,
                projectId,
                body,
            )
            res.setHeader(
                'Content-Type', 'application/json'
            ).status(response.statusCode).send({...response});
        } catch (err) {
            console.error('Error al registrar usuario:', err);
        }
    }


    async patch(req: Request, res: Response, _next: NextFunction) {
        const projectId = Number(req.params.projectId);
        const id = Number(req.params.id);
        const response = await this.service.updateTeam(
            req.userAuth!.email,
            projectId,
            id,
            req.body.role,
        )
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async get(req: Request, res: Response, _next: NextFunction) {
        const projectId = Number(req.params.projectId);
        const id = Number(req.params.id);
        const include = {
            project: { select: { name: true, description: true }},
        }
        const response = await this.service.get({id, projectId}, "role", undefined, include)
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async getAll(req: Request, res: Response, _next: NextFunction) {
        const projectId = Number(req.params.projectId);
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
        const response = await this.service.getAll(limit * (page - 1), limit, include, 'role', {
            projectId, NOT: {
                role: "admin"
            }
        })
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

    async delete(req: Request, res: Response, _next: NextFunction) {
        const projectId = Number(req.params.projectId);
        const id = Number(req.params.id);
        const response = await this.service.deleteTeam(
            req.userAuth!.email,
            projectId,
            id
        )
        res.setHeader(
            'Content-Type', 'application/json'
        ).status(response.statusCode).send(
            JSON.stringify(response, (_, v) => typeof v === 'bigint' ? v.toString() : v)
        );
    }

}