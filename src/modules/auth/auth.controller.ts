import { catchAsync } from "../../utilities/catchAsync";
import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";



const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;
    const loginResult = await authService.loginUser(payload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: loginResult
    })

})

export const AuthController = {
    loginUser
}