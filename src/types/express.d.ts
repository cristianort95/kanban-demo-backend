import {UserAuth} from "../auth/domain/user-auth";

declare module "express" {
    export interface Request {
        userAuth?: UserAuth
    }
}