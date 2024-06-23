
import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


/* 
user---------------------------- 
username
password
phone
email
gender
birthDate
nationalID

family

doc -------
role
height
weight
bloodType
suffers
currentMedicine

surgicalHistory: {
        surgeryType,
        dateOfSurgery,}


allergies
chronicDisease

User update 
Multer
Qr
*/


// update data from user
export const getDataUser = asyncHandler(async (req, res, next) => {
    const {
        username,
        email,
        phone,
        gender,
        birthDate,
        nationalID,
        family
    } = req.body;
    const user = await userModel.findByIdAndUpdate(req.user._id, req.body, { new: true })
    return res.status(201).json({ message: "Done", user });

})

// update data from doc
export const getDataAdmin = asyncHandler(async (req, res, next) => {
    const {
        userId,
        role,
        height,
        weight,
        bloodType,
        suffers,
        currentMedicine,
        surgicalHistory,
        allergies,
        chronicDisease,
        organDonor
    } = req.body;
    const user = await userModel.findByIdAndUpdate(userId, req.body, { new: true })
    return res.status(201).json({ message: "Done", user });

})

//userProPic multer
export const userProPic = asyncHandler(async (req, res, next) => {

    if (!req.file) {
        return next(new Error("Image is required", { cause: 409 }))
    }

    const user = await userModel.findByIdAndUpdate(req.user._id,
        { profilePic: req.file.dest }, { new: true })
    return res.status(201).json({ message: "Done", user })
}) 
