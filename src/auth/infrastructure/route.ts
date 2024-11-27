import express from "express";
import {authController} from "./dependencies";

const routerAuth = express.Router();
routerAuth.post("/login", authController.login.bind(authController))
export default routerAuth