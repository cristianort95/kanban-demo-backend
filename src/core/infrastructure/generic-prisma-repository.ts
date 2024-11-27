import {Prisma, PrismaClient} from '@prisma/client'
import {ResponseRequest} from "../domain/response-request";
import {GenericPrisma} from "../domain/generic-prisma-repository";

const prisma = new PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
})

export class GenericPrismaRepository implements GenericPrisma {

    async create (data: any, modelName: string): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).create({data});
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info('ERORR', e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else if(e instanceof Prisma.PrismaClientValidationError) {
                console.info('ERORR', e.message)
                return { message: e.name, status:false, statusCode: 400 }
            } else {
                console.info('ERORR', e.toString())
                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async update (where: object, data: object, modelName: string): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).update({where, data,});
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERORR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async delete (where: object, modelName: string): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).delete({where});
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERORR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async get (where: object, modelName: string, omit?: object, include?: any): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).findUniqueOrThrow({where, omit, include});
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERORR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

    async getAll (skip: number, take: number, include: any, modelName: string, where?: object): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).findMany({where, skip, take, include });
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                console.info(e.message)
                return { message: e.message, status:false, statusCode: 400 }
            } else {
                console.info('ERORR', e.toString())

                return { message: e.toString(), status:false, statusCode: 400 }
            }
        }
    }

}