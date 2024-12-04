import {ResponseRequest} from "../../core/domain/response-request";
import {GenericPrisma} from "../../core/domain/generic-prisma-repository";

export class CommentService {
    constructor(readonly orm: GenericPrisma) {}

    async create(data: any): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId: data.userId, projectId: data.projectId}, "role", undefined, undefined);
        if (role.status)
            return await this.orm.create({
                userId: data.userId,
                taskId: data.taskId,
                projectId: data.projectId,
                comment: data.comment
            }, "comment");
        else
            return role
    }

    async update (id: number, data: any, userId: number, projectId: number, taskId: number): Promise<ResponseRequest> {
        delete data.userId;
        const role = await this.orm.getFirst({userId, projectId}, "role", undefined, undefined);
        if (role.status)
            return await this.orm.update({id, projectId, taskId}, {comment: data.comment}, "comment");
        else
            return role
    }

    async get(id: number, projectId: number, taskId: number): Promise<ResponseRequest> {
        return await this.orm.get({id, projectId, taskId}, "comment");
    }

    async getAll(skip: number, take: number, relationsFields: any, where?: object): Promise<ResponseRequest> {
        return await this.orm.getAll(skip, take, relationsFields, "comment", where);
    }

    async delete (id: number, userId: number, projectId: number, taskId: number): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId, projectId}, "role", undefined, undefined);
        if (role.status)
            return await this.orm.delete({id, projectId, taskId}, "comment");
        else
            return role
    }
}
