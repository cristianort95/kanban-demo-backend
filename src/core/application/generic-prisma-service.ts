import {ResponseRequest} from "../domain/response-request";
import {GenericPrisma} from "../domain/generic-prisma-repository";


export class GenericPrismaService {
    constructor(readonly orm: GenericPrisma) {}

    async create (data: any, modelName: String): Promise<ResponseRequest> {
        return await this.orm.create(data, modelName as string);
    }

    async update (where: object, data: object, modelName: String): Promise<ResponseRequest> {
        return await this.orm.update(where, data, modelName as string);
    }

    async delete (where: object, modelName: String): Promise<ResponseRequest> {
        return await this.orm.delete(where, modelName as string);
    }

    async get (where: object, modelName: String, omit?: object, relationsFields?: any): Promise<ResponseRequest> {
        return await this.orm.get(where, modelName as string, omit, relationsFields);
    }

    async getAll (skip: number, take: number, relationsFields: any, modelName: String, where?: object): Promise<ResponseRequest> {
        return await this.orm.getAll(skip, take, relationsFields, modelName as string, where);
    }
}