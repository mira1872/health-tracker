import cors from "cors"
import connectDB from "../DB/connection.js"
import authRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import { globalErrorHandling } from "./utils/errorHandling.js"

const initApp = (app, express) => {
    app.use(cors())
    app.use(express.json({}))

    app.use("/auth", authRouter)
    app.use("/user", userRouter)

    app.get("/", (req, res, next) => {
        res.json("Home")
    })

    app.use(globalErrorHandling)
    connectDB()
}

export default initApp