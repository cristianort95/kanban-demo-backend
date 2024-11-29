import express from "express";
import routerUser from "../../user/infrastructure/route";
import routerAuth from "../../auth/infrastructure/route";
import routerProject from "../../project/infrastructure/route";
import routerTask from "../../task/infrastructure/route";

const router = express.Router();
router.use("/auth", routerAuth);
router.use("/users", routerUser);
router.use("/projects", routerProject);
router.use("/tasks", routerTask);
export default router;