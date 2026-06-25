import { Request, RequestHandler, Response, NextFunction } from "express";

import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utilies/catchAsync";



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

    res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully",
        data: {
            user
        }
    })
})

export const UserController = {
    registerUser
}