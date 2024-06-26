import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

//name , pass , email , phone , description , role

export const getUserData = joi.object({

    username: joi.string(),
    email: joi.string().email(),
    phone: joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)),
    family: joi.array().items({
        rev: joi.string().max(20),
        nationalID: joi.string(),
        revPhone: joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/))
    }),
    nationalID: joi.string().max(20),
    gender: joi.string().valid('male', 'female'),
    birthDate: joi.date(),
}).required()

export const getAdminData = joi.object({
    userId: generalFields.id,
    role: joi.string().valid('user', 'admin'),
    height: joi.string().min(1).max(3),
    weight: joi.string().min(1).max(3),
    bloodType: joi.string(),
    suffers: joi.string(),
    currentMedicine: joi.string(),
    surgicalHistory: joi.array().items({
        surgeryType: joi.string(),
        dateOfSurgery: joi.date(),
    }),

    allergies: joi.string(),
    chronicDisease: joi.string(),
    organDonor: joi.string(),
}).required()

export const userProPic = joi.object({
    file: generalFields.file
})

export const medicalTests = joi.object({
    file: generalFields.file
})