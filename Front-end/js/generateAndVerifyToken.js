import jwt from "jsonwebtoken"

export const createToken = ({payload={},signature = "hi@WshlliN$" , expiresIn = 60 * 60}={})=>{
    const token = jwt.sign(payload,signature,{expiresIn:parseInt(expiresIn)})
    return token
}

export const verifyToken = ({token = "" , signature = "hi@WshlliN$"}={})=>{
    const decoded = jwt.verify(token,signature)
    return decoded
}