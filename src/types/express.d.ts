import {UserAuth} from "../auth/domain/UserAuth";

declare module "express" {
    export interface Request {
        userAuth?: UserAuth
    }
}