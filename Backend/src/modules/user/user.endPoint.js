import { roles } from "../../middleware/auth.js";



export const endpoint = {
    getUserData: [roles.user, roles.admin],
    getAdminData: [roles.admin],
    userProPic: [roles.user, roles.admin],
    medicalTests: [roles.user, roles.admin]
}