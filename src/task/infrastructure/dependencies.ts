import {GenericPrismaRepository} from "../../core/infrastructure/generic-prisma-repository";
import {TaskController} from "./task-controller";
import {TaskService} from "../application/task-service";

const genericRepository = new GenericPrismaRepository()
const genericService = new TaskService(genericRepository)

export const taskController = new TaskController(genericService)