import { Router } from "express";
import { UserController } from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleweares/auth";


const router = Router();



router.post("/register", UserController.registerUser)



router.get("/me",
    // (req: Request, res: Response, next: NextFunction) => {
    //     console.log(req.cookies)
    //     const { accessToken } = req.cookies;
    //     console.log(accessToken);


    //     const verifiedToken = jwtUtilis.verifyToken(accessToken, config.jwt_access_secret);

    //     if (!verifiedToken.success) {
    //         throw new Error(verifiedToken.message as string);
    //     }

    //     const { email, name, id, role } = verifiedToken.data as JwtPayload;
    //     // const requiredRoles = ["ADMIN", "USER", "AUTHOR"];
    //     const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

    //     if (!requiredRoles.includes(role as Role)) {
    //         return res.status(403).json({
    //             success: false,
    //             statusCode: httpStatus.FORBIDDEN,
    //             message: "forbidden"
    //         })
    //     }

    //     req.user = {
    //         id,
    //         name,
    //         email,
    //         role
    //     }

    //     return next();
    // }, 
    auth(Role.ADMIN, Role.AUTHOR, Role.USER),
    UserController.getMyProfile);

router.put("/my-profile", auth(Role.ADMIN, Role.AUTHOR, Role.USER), UserController.updateMyProfile);


export const userRoutes = router;

