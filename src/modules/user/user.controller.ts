import { Request, RequestHandler, Response, NextFunction } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utilities/catchAsync";
import { sendResponse } from "../../utilities/sendResponse";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtilis } from "../../utilities/jwt";



// export const registerUser = async (req: Request, res: Response) => {
//     try {
//         const payload = req.body;

//         const user = await userService.registerUserIntoDB(payload)

//         res.status(httpStatus.CREATED).json({
//             success: true,
//             statusCode: httpStatus.CREATED,
//             message: "User created successfully",
//             data: user
//         })
//     } catch (error: any) {
//         console.log(error)
//         res.status(httpStatus.BAD_REQUEST).json({
//             success: false,
//             statusCode: httpStatus.BAD_REQUEST,
//             message: error.message
//         })
//     }
// }



const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    // res.status(httpStatus.CREATED).json({
    //     statusCode: httpStatus.CREATED,
    //     success: true,
    //     message: "User registered successfully",
    //     data: {
    //         user
    //     }
    // })

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: {
            user
        }
    })
})

const getMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const cookies = req.cookies;
    // const { accessToken } = req.cookies;
    // console.log(req.user, "user Request");

    // const verifiedToken = jwtUtilis.verifyToken(accessToken, config.jwt_access_secret);
    // console.log(verifiedToken);

    // if (typeof verifiedToken === "string") {
    //     throw new Error(verifiedToken);
    // }

    const profile = await userService.getMyProfileFromDB(req.user?.id as string);



    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile fetched successfully",
        data: {
            profile
        }
    })
})

const updateMyProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;

    const payload = req.body;

    const updatedProfile = await userService.updateMyProfileInDB(userId, payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User profile updated successfully",
        data: {
            updatedProfile
        }
    })

})



export const UserController = {
    registerUser,
    getMyProfile,
    updateMyProfile
}