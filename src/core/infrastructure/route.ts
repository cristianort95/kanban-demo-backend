import express from "express";
import routerUser from "../../user/infrastructure/route";
import routerAuth from "../../auth/infrastructure/route";
import routerProject from "../../project/infrastructure/route";

const router = express.Router();
router.use("/auth", routerAuth);
router.use("/users", routerUser);
router.use("/projects", routerProject);
export default router;