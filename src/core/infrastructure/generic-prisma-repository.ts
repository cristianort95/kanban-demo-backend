import {Prisma, PrismaClient} from '@prisma/client'
import {ResponseRequest} from "../domain/response-request";
import {GenericPrisma} from "../domain/generic-prisma-repository";
import {TransactionOrm} from "../domain/transaction-orm";

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
            console.error('GenericPrismaRepository -> create', e.message)
            return this.getError(e)
        }
    }

    async createTransaction (transactionsOrm: TransactionOrm[]): Promise<ResponseRequest> {
        try {
            const transactionsResult = await prisma.$transaction(async (prisma) => {
                const lotTransactions: any[] = [];

                for (const transaction of transactionsOrm) {
                    if (transaction.refField)
                        for (const field of transaction.refField) {
                            transaction.data[field.field] = lotTransactions[field.value].id
                        }
                    lotTransactions.push(await ((prisma as any)[transaction.modelName]).create({data: transaction.data}))
                }
                return lotTransactions;
            });

            return { statusCode: 200, data: transactionsResult, status:true, message:'' }
        } catch (e: any) {
            console.error('GenericPrismaRepository -> create', e.message)
            return this.getError(e)
        }
    }

    async update (where: object, data: object, modelName: string): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).update({where, data,});
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            console.error('GenericPrismaRepository -> update', e.message)
            return this.getError(e)
        }
    }

    async delete (where: object, modelName: string): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).delete({where});
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            console.error('GenericPrismaRepository -> delete', e.message)
            return this.getError(e)
        }
    }

    async get (where: object, modelName: string, omit?: object, include?: any): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).findUniqueOrThrow({where, omit, include});
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            console.error('GenericPrismaRepository -> get', e.message)
            return this.getError(e)
        }
    }

    async getAll (skip: number, take: number, include: any, modelName: string, where?: object): Promise<ResponseRequest> {
        try {
            const dataResponse = await ((prisma as any)[modelName]).findMany({where, skip, take, include });
            return { statusCode: 200, data: dataResponse, status:true, message:'' }
        } catch (e: any) {
            console.error('GenericPrismaRepository -> getAll', e.message)
            return this.getError(e)
        }
    }

    private getError = (e: any): ResponseRequest  => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return { errors: [{code: e.code, msg: e.meta}], status:false, statusCode: 400 }
        } else if(e instanceof Prisma.PrismaClientValidationError) {
            return { errors: [{code: "P00VALID", msg: e.message}], status:false, statusCode: 400 }
        } return { message: e.toString(), status:false, statusCode: 400 }
    }
}