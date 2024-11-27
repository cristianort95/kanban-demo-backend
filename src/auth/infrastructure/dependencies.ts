import {GenericPrismaService} from "../../core/application/generic-prisma-service";
import {GenericPrismaRepository} from "../../core/infrastructure/generic-prisma-repository";
import {AuthController} from "./auth-controller";
import {AuthMiddleware} from "./auth-middleware";

const genericRepository = new GenericPrismaRepository()
const genericService = new GenericPrismaService(genericRepository)

export const authController = new AuthController(genericService)
export const authMiddleware = new AuthMiddleware()