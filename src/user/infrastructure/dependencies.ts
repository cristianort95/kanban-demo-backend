import {GenericPrismaService} from "../../core/application/generic-prisma-service";
import {GenericPrismaRepository} from "../../core/infrastructure/generic-prisma-repository";
import {UserController} from "./user-controller";
import {PasswordValidationService} from "../application/password-validationService";

const genericRepository = new GenericPrismaRepository()
const genericService = new GenericPrismaService(genericRepository)
const passwordValidationService = new PasswordValidationService()

export const userController = new UserController(genericService, passwordValidationService)