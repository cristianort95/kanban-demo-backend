import express from "express";
import { authMiddleware } from "../../auth/infrastructure/dependencies";
import {teamController} from "./dependencies";

const _authMiddleware = authMiddleware.validate.bind(authMiddleware)

const router = express.Router();
router.post("/:projectId", _authMiddleware, teamController.post.bind(teamController))
router.get("/:projectId", _authMiddleware, teamController.getAll.bind(teamController))
router.get("/:projectId/:id", _authMiddleware, teamController.get.bind(teamController))
router.patch("/:projectId/:id", _authMiddleware, teamController.patch.bind(teamController))
router.delete("/:projectId/:id", _authMiddleware, teamController.delete.bind(teamController))
export default router