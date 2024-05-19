import joi from "joi"

//name , pass , email , phone , description , role

export const signUpSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(32).required(),
    cPassword: joi.string().min(6).max(32).valid(joi.ref("password")).required(),
    phone: joi.string().pattern(new RegExp(/^01[0125][0-9]{8}$/)).required(),
    description: joi.object({
        title: joi.string().max(20),
        hospital: joi.string()
    })
}).required()

export const logInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(32).required(),
}).required()