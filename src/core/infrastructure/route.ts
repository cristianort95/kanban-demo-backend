import express from "express";
import routerUser from "../../user/infrastructure/route";
import routerAuth from "../../auth/infrastructure/route";
import {authMiddleware} from "../../auth/infrastructure/dependencies";

const router = express.Router();
router.use("/auth", routerAuth);
router.use("/users", authMiddleware.validate.bind(authMiddleware), routerUser);
export default router;