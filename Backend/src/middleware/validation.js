import joi from "joi"
import { Types } from "mongoose"

const validateObjectId = (value, helper) => {
    return Types.ObjectId.isValid(value) ? true : helper.message("In-valid objectId")
}

export const generalFields = {
    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ["com", "net"] }
    }).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword: joi.string().required(),
    id: joi.string().custom(validateObjectId).required(),
    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
    })
}

export const validation = (schema, considerHeaders = false) => {
    return (req, res, next) => {
        let inputsData = { ...req.body, ...req.params, ...req.query }

        if (req.headers?.authorization && considerHeaders) {
            inputsData = { authorization: req.headers.authorization }
        }

        const validationResult = schema.validate(inputsData, { abortEarly: false })
        if (validationResult.error) {
            return res.status(400).json({ message: 'validationErr', validationErr: validationResult.error.details })
        }
        return next()
    }

}
export default validation