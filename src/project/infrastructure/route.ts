import express from "express";
import { authMiddleware } from "../../auth/infrastructure/dependencies";
import {projectController} from "./dependencies";

const _authMiddleware = authMiddleware.validate.bind(authMiddleware)

const router = express.Router();
router.post("", _authMiddleware, projectController.post.bind(projectController))
router.get("/", _authMiddleware, projectController.getAll.bind(projectController))
router.get("/:id", _authMiddleware, projectController.get.bind(projectController))
router.patch("/:id", _authMiddleware, projectController.patch.bind(projectController))
router.delete("/:id", _authMiddleware, projectController.delete.bind(projectController))
export default router