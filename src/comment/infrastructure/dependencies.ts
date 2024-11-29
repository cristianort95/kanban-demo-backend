import {GenericPrismaRepository} from "../../core/infrastructure/generic-prisma-repository";
import {CommentController} from "./comment-controller";
import {CommentService} from "../application/comment-service";

const genericRepository = new GenericPrismaRepository()
const genericService = new CommentService(genericRepository)

export const commentController = new CommentController(genericService)