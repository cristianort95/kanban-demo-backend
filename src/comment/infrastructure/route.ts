import express from "express";
import { authMiddleware } from "../../auth/infrastructure/dependencies";
import { commentController } from "./dependencies";

const _authMiddleware = authMiddleware.validate.bind(authMiddleware)

const router = express.Router();
router.post("/:projectId/:taskId", _authMiddleware, commentController.post.bind(commentController))
router.get("/:projectId/:taskId", _authMiddleware, commentController.getAll.bind(commentController))
router.get("/:projectId/:taskId/:id", _authMiddleware, commentController.get.bind(commentController))
router.patch("/:projectId/:taskId/:id", _authMiddleware, commentController.patch.bind(commentController))
router.delete("/:projectId/:taskId/:id", _authMiddleware, commentController.delete.bind(commentController))
export default router