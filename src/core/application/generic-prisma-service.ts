import {ResponseRequest} from "../domain/response-request";
import {Prisma} from "@prisma/client";
import {GenericPrisma} from "../domain/generic-prisma-repository";


export class GenericPrismaService {
    constructor(readonly orm: GenericPrisma) {}

    async create (data: any, modelName: String): Promise<ResponseRequest> {
        try {
            const d = await this.orm.create(data, modelName as string);
            return { statusCode: d.statusCode, data: d.data, status: d.status, message: d.message || "" }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERROR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async update (where: object, data: object, modelName: String): Promise<ResponseRequest> {
        try {
            const d = await this.orm.update(where, data, modelName as string);
            return { statusCode: d.statusCode, data: d.data, status:d.status, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERROR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async delete (where: object, modelName: String): Promise<ResponseRequest> {
        try {
            const d = await this.orm.delete(where, modelName as string);
            return { statusCode: d.statusCode, data: d.data, status:d.status, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERROR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async get (where: object, modelName: String, omit?: object, relationsFields?: any): Promise<ResponseRequest> {
        try {
            const d = await this.orm.get(where, modelName as string, omit, relationsFields);
            return { statusCode: d.statusCode, data: d.data, status:d.status, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERROR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async getAll (skip: number, take: number, relationsFields: any, modelName: String, where?: object): Promise<ResponseRequest> {
        try {
            const d = await this.orm.getAll(skip, take, relationsFields, modelName as string, where);
            return { statusCode: d.statusCode, data: d.data, status:d.status, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERROR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }
}