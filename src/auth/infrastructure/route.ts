import express from "express";
import {authController} from "./dependencies";

const router = express.Router();
router.post("/login", authController.login.bind(authController))
export default router