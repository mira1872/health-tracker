import bcrypt from "bcrypt"

export const hash = ({ plaintext, saltRound = 8 } = {}) => {

    const hashResult = bcrypt.hashSync(plaintext, parseInt(saltRound))
    console.log(hashResult);
    return hashResult
}

export const compare = ({ hashValue, plaintext } = {}) => {

    const compareResult = bcrypt.compareSync(plaintext, hashValue)
    return compareResult
}