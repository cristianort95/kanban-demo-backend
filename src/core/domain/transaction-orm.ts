import {TransactionFieldOrm} from "./transaction-field-orm";

export class TransactionOrm {
    constructor(
        readonly data: any, readonly modelName: string, readonly refField?: TransactionFieldOrm[]
    ) {}
}