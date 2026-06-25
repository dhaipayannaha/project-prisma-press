import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: string, expiresIn: string) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"]
    });
    return token;
}

export const jwtUtilis = {
    createToken
}
