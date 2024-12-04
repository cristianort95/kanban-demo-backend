
import {UserAuth} from "../../auth/domain/user-auth";
import {ResponseRequest} from "../../core/domain/response-request";
import {GenericPrismaService} from "../../core/application/generic-prisma-service";
import {TransactionOrm} from "../../core/domain/transaction-orm";

export class ProjectService extends GenericPrismaService{

    async createProject(name: string, description: string, role: string, user: UserAuth): Promise<ResponseRequest> {
        const transaction: TransactionOrm[] = [
            {modelName: "project", data: {name, description}},
            {modelName: "role", data: {userId: user.email, role}, refField: [{field: "projectId", value: 0}]}
        ]
        return await this.orm.createTransaction(transaction);
    }

    async deleteProject (where: any): Promise<ResponseRequest> {
        const role = await this.orm.get(where, "role" as string, undefined, undefined);
        if (role.status)
            return await this.orm.delete({id: role.data.projectId}, "project" as string);
        else
            return role
    }

    async updateProject (where: any, data: any): Promise<ResponseRequest> {
        const role = await this.orm.get(where, "role" as string, undefined, undefined);
        if (role.status)
            return await this.orm.update(
                {id: role.data.projectId},
                {name: data.name, description: data.description},
                "project"
            );
        else
            return role
    }
}
