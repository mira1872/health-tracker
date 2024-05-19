import { Router } from "express";
import * as userController from "./controller/user.js"
import * as validators from "./user.validation.js"
import validation from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./user.endPoint.js";

const userRouter = Router()

/* userRouter.get("/",  userController.test ) */

userRouter.post("/getUserData",
    auth(endpoint.getUserData),
    validation(validators.getUserData),
    userController.getDataUser)

    userRouter.post("/getAdminData",
    auth(endpoint.getAdminData),
    validation(validators.getAdminData),
    userController.getDataAdmin)

export default userRouter