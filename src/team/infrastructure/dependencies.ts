import {GenericPrismaRepository} from "../../core/infrastructure/generic-prisma-repository";
import {TeamController} from "./team-controller";
import {TeamService} from "../application/team-service";

const genericRepository = new GenericPrismaRepository()
const projectService = new TeamService(genericRepository)

export const teamController = new TeamController(projectService)