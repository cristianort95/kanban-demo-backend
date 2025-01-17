import {GenericPrismaRepository} from "../../core/infrastructure/generic-prisma-repository";
import {ProjectController} from "./project-controller";
import {ProjectService} from "../application/project-service";

const genericRepository = new GenericPrismaRepository()
const projectService = new ProjectService(genericRepository)

export const projectController = new ProjectController(projectService)