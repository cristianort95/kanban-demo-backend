import express from "express";
import { authMiddleware } from "../../auth/infrastructure/dependencies";
import { taskController } from "./dependencies";

const _authMiddleware = authMiddleware.validate.bind(authMiddleware)

const router = express.Router();
router.post("/:projectId", _authMiddleware, taskController.post.bind(taskController))
router.get("/:projectId", _authMiddleware, taskController.getAll.bind(taskController))
router.get("/:projectId/:id", _authMiddleware, taskController.get.bind(taskController))
router.patch("/:projectId/:id", _authMiddleware, taskController.patch.bind(taskController))
router.delete("/:projectId/:id", _authMiddleware, taskController.delete.bind(taskController))
export default router