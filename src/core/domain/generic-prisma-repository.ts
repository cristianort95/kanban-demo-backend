import {ResponseRequest} from "./response-request";
import {TransactionOrm} from "./transaction-orm";

export interface GenericPrisma {
    createTransaction (transactionsOrm: TransactionOrm[]): Promise<ResponseRequest>
    create (data: any, modelName: String): Promise<ResponseRequest>;
    update (where: object, data: object, modelName: String): Promise<ResponseRequest>;
    delete (where: object, modelName: String): Promise<ResponseRequest>;
    get (where: object, modelName: String, omit?: object, include?: any): Promise<ResponseRequest>;
    getFirst (where: object, modelName: String, omit?: object, include?: any): Promise<ResponseRequest>;
    getAll (skip: number, take: number, include: any, modelName: String, where?: object): Promise<ResponseRequest>;
}