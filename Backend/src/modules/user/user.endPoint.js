import { roles } from "../../middleware/auth.js";



export const endpoint = {
    getUserData: [roles.user],
    getAdminData: [roles.admin],
    userProPic: [roles.user , roles.admin],
}