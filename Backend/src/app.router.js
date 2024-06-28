import cors from "cors"
import connectDB from "../DB/connection.js"
import authRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import { globalErrorHandling } from "./utils/errorHandling.js"
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)) // url a7na fiin 7alin



const initApp = (app, express) => {
    app.use(cors())
    app.use(express.json({}))

    app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

    app.get('/pdf/:filename', (req, res) => {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, './uploads', filename);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        res.sendFile(filePath);
      });


    app.use("/auth", authRouter)
    app.use("/user", userRouter)

    app.get("/", (req, res, next) => {
        res.json("Home")
    })

    app.use(globalErrorHandling)
    connectDB()
}

export default initApp