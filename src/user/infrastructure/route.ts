import express from "express";
import { authMiddleware } from "../../auth/infrastructure/dependencies";
import {userController} from "./dependencies";

const _authMiddleware = authMiddleware.validate.bind(authMiddleware)

const router = express.Router();
router.post("", userController.post.bind(userController))
router.get("", _authMiddleware, userController.get.bind(userController))
router.patch("", _authMiddleware, userController.patch.bind(userController))
router.delete("", _authMiddleware, userController.delete.bind(userController))
export default router