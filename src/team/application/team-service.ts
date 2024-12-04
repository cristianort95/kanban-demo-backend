import {ResponseRequest} from "../../core/domain/response-request";
import {GenericPrismaService} from "../../core/application/generic-prisma-service";

export class TeamService extends GenericPrismaService{

    async addMember(userId: string, projectId: number, data: any): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId, projectId, role: "admin"}, "role", undefined, undefined);
        if (role.status)
            return await this.orm.create(data, "role");
        else
            return role
    }

    async updateTeam (userId: string, projectId: number, idRole: number, roleTeam: string): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId, projectId, role: "admin"}, "role", undefined, undefined);
        if (role.status)
            return await this.orm.update(
                {id: idRole}, {role: roleTeam}, "role"
            );
        else
            return role
    }

    async deleteTeam (userId: string, projectId: number, idRole: number): Promise<ResponseRequest> {
        const role = await this.orm.getFirst({userId, projectId, role: "admin"}, "role", undefined, undefined);
        if (role.status)
            return await this.orm.delete({id: idRole}, "role" as string);
        else
            return role
    }
}
