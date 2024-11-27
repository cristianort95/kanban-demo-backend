import express from "express";
import { authMiddleware } from "../../auth/infrastructure/dependencies";
import {userController} from "./dependencies";

const _authMiddleware = authMiddleware.validate.bind(authMiddleware)

const routerAuth = express.Router();
routerAuth.post("", userController.post.bind(userController))
routerAuth.get("", _authMiddleware, userController.get.bind(userController))
routerAuth.patch("", _authMiddleware, userController.patch.bind(userController))
routerAuth.delete("", _authMiddleware, userController.delete.bind(userController))
export default routerAuth