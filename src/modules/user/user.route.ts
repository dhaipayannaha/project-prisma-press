import { NextFunction, Router } from "express";
import { UserController } from "./user.controller";
import { Request, Response } from "express";
import { jwtUtilis } from "../../utilities/jwt";
import config from "../../config";
import httpStatus from "http-status";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
                role: Role;
            }
        }
    }
}

router.post("/register", UserController.registerUser)
router.get("/me", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.cookies)
    const { accessToken } = req.cookies;
    console.log(accessToken);

    const verifiedToken = jwtUtilis.verifyToken(accessToken, config.jwt_access_secret);

    if (typeof verifiedToken === "string") {
        throw new Error(verifiedToken);
    }

    const { email, name, id, role } = verifiedToken;
    // const requiredRoles = ["ADMIN", "USER", "AUTHOR"];
    const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

    if (!requiredRoles.includes(role as Role)) {
        return res.status(403).json({
            success: false,
            statusCode: httpStatus.FORBIDDEN,
            message: "forbidden"
        })
    }

    req.user = {
        id,
        name,
        email,
        role
    }

    return next();
}, UserController.getMyProfile)


export const userRoutes = router;

