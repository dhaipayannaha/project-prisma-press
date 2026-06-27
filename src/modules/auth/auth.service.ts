import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IloginUser } from "./auth.interface";

import config from "../../config";
import { jwtUtilis } from "../../utilities/jwt";


const loginUser = async (payload: IloginUser) => {
    const { email, password } = payload;

    const user = await prisma.user.findUniqueOrThrow({
        where: { email }
    })

    if (user.activeStatus === "BLOCKED") {
        throw new Error("User is blocked")
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        throw new Error("Invalid credential!");
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret,
    //     {
    //         expiresIn: config.jwt_access_expires_in
    //     } as SignOptions
    // )

    const accessToken = jwtUtilis.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in)

    const refreshToken = jwtUtilis.createToken(jwtPayload, config.jwt_refresh_secret, config.jwt_refresh_expires_in
    )


    return { accessToken, refreshToken };

}

export const authService = {
    loginUser
}