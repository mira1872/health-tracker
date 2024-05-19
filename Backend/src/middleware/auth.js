import userModel from "../../DB/model/User.model.js";
import { asyncHandler } from "../utils/errorHandling.js";
import { verifyToken } from "../utils/generateAndVerifyToken.js";

export const roles = {
    admin: "admin",
    user: "user",
}

/* authorization */
export const auth = (accessRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        const { authorization } = req.headers
        if (!authorization?.startsWith(process.env.TOKENSTARTSWITH)) {
            return next(new Error("In-valid authorization"), { cause: 400 })
        }
        const token = authorization.split(process.env.TOKENSTARTSWITH)[1]
        if (!token) {
            return next(new Error("token is required"), { cause: 400 })
        }
        const decoded = verifyToken({ token: token })
        if (!decoded?.id) {
            return next(new Error("In-valid payload"))
        }
        const user = await userModel.findById(decoded.id).select('userName email image role status changePasswordTime')
        if (!user) {
            return next(new Error("Not retested account", { cause: 401 }))
        }
        if (parseInt(user?.changePasswordTime?.getTime() / 1000) > decoded.iat) {
            return next(new Error(`Expire token`, { cause: 401 }))
        }
         if (user.status == 'blocked') {
            return next(new Error("blocked account", { cause: 403 }))
        }
        if (!accessRoles.includes(user.role)) {
            return next(new Error("Not authorized account", { cause: 403 }))
        }
        req.user = user;
        return next()
    })
}

/* export const authorized = (accessRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        if (!accessRoles.includes(user.role)) {
            return next(new Error("Not authorized account", { cause: 403 }))
        }
        return next()
    })
} */