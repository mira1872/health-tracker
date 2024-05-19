import { Router } from "express";
import * as authController from "./controller/auth.js"
import validation from "../../middleware/validation.js";
import * as validators from "./auth.validation.js"

const authRouter = Router()

authRouter.get("/",  authController.test )

authRouter.get("/:userId",  authController.findUser )

authRouter.post("/signup", validation(validators.signUpSchema), authController.signUp)

authRouter.post("/login", validation(validators.logInSchema), authController.login)

export default authRouter