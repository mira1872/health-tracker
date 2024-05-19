import jwt from "jsonwebtoken"

export const createToken = ({payload={},signature = process.env.signatureCode , expiresIn = 60 * 60}={})=>{
    const token = jwt.sign(payload,signature,{expiresIn:parseInt(expiresIn)})
    return token
}

export const verifyToken = ({token = "" , signature = process.env.signatureCode}={})=>{
    const decoded = jwt.verify(token,signature)
    return decoded
}