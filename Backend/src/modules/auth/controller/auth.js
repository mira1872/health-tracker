
import userModel from "../../../../DB/model/User.model.js";
import ApiFeatures from "../../../utils/apiFeatures.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { createToken } from "../../../utils/generateAndVerifyToken.js";
import { compare, hash } from "../../../utils/hashAndCompare.js";
import QRCode from "qrcode"

export const getUsers = asyncHandler(async (req, res, next) => {

    const apiFeature = new ApiFeatures(userModel.find({}), req.query).paginate().filter().sort().search().select()
    const users = await apiFeature.mongooseQuery

    return res.status(200).json({ message: "Done", users: users })
})

export const findUser = asyncHandler(async (req, res, next) => {

    const user = await userModel.findById(req.params.userId);

    QRCode.toDataURL(`${req.protocol}://${req.headers.host}/auth?_id=${req.params.userId}`, (err, url) => {
        return res.status(200).json({ message: "Done", users: user, url: url })
    })


})


export const signUp = asyncHandler(async (req, res, next) => {

    const { username, password, email, phone } = req.body;

    //email not exist
    if (await userModel.findOne({ email })) {
        return next(new Error("Email already exists", { cause: 409 }));
    }

    req.body.password = hash({ plaintext: password });

    const user = await userModel.create(req.body);
    return res.status(201).json({ message: "Done", user });

})

export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return next(new Error('Invalid Email ', { cause: 403 }))
    }

    const match = compare({ plaintext: password, hashValue: user.password })
    if (!match) {
        return next(new Error('Invalid Password', { cause: 403 }))
    }

    const refresh_token = createToken({
        payload: {
            id: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        },
        expiresIn: 60 * 60 * 24 * 360
    })

    return res.status(200).json({ message: "Done", refresh_token, id: user._id })

})