import express from "express";
import routerUser from "../../user/infrastructure/route";
import routerAuth from "../../auth/infrastructure/route";

const router = express.Router();
router.use("/auth", routerAuth);
router.use("/users", routerUser);
export default router;