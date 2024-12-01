import express from "express";
import routerUser from "../../user/infrastructure/route";
import routerAuth from "../../auth/infrastructure/route";
import routerProject from "../../project/infrastructure/route";
import routerTask from "../../task/infrastructure/route";
import routerComment from "../../comment/infrastructure/route";
import routerTeam from "../../team/infrastructure/route";

const router = express.Router();
router.use("/auth", routerAuth);
router.use("/users", routerUser);
router.use("/projects", routerProject);
router.use("/tasks", routerTask);
router.use("/comments", routerComment);
router.use("/teams", routerTeam);
export default router;