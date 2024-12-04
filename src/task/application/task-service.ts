import {ResponseRequest} from "../../core/domain/response-request";
import {GenericPrisma} from "../../core/domain/generic-prisma-repository";

export class TaskService {
    constructor(readonly orm: GenericPrisma) {}

    async create(data: any, userId: string): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId, projectId: data.projectId}, "role", undefined, undefined);
        const roleTask = await this.orm.getFirst({userId: data.userId, projectId: data.projectId}, "role", undefined, undefined);
        if (role.status && roleTask.status)
            return await this.orm.create(data, "task");
        else
            return role
    }

    async update (id: number, data: any, userId: string, projectId: number): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId, projectId: data.projectId}, "role", undefined, undefined);
        const roleTask = await this.orm.getFirst({userId: data.userId, projectId: data.projectId}, "role", undefined, undefined);
        if (role.status && roleTask.status)
            return await this.orm.update({id, projectId}, data, "task");
        else
            return role
    }

    async get(id: number, projectId: number): Promise<ResponseRequest> {
        return await this.orm.get({id, projectId}, "task");
    }

    async getAll(skip: number, take: number, relationsFields: any, where?: object): Promise<ResponseRequest> {
        return await this.orm.getAll(skip, take, relationsFields, "task", where);
    }

    async delete (id: number, userId: string, projectId: number): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId, projectId}, "role", undefined, undefined);
        if (role.status)
            return await this.orm.delete({id, projectId}, "task");
        else
            return role
    }
}
