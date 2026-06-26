import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"]
    });
    return token;
}

const verifyToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret);
        return verifiedToken;
    } catch (error: any) {
        console.log("Token verification faild")
        throw new Error(error.message)
    }
}

export const jwtUtilis = {
    createToken,
    verifyToken
}
