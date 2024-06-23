import { Router } from "express";
import * as userController from "./controller/user.js"
import * as validators from "./user.validation.js"
import validation from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { endpoint } from "./user.endPoint.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";

const userRouter = Router()

/* userRouter.get("/",  userController.test ) */

userRouter.post("/updateUserData",
    auth(endpoint.getUserData),
    validation(validators.getUserData),
    userController.getDataUser)

userRouter.post("/updateAdminData",
    auth(endpoint.getAdminData),
    validation(validators.getAdminData),
    userController.getDataAdmin)

//userProPic multer
userRouter.post("/userProPic",
    auth(endpoint.userProPic),
    validation(validators.userProPic),
    fileUpload("user/profile", fileValidation.image).single("image"),
    userController.userProPic)

export default userRouter