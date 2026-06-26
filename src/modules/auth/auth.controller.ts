import { catchAsync } from "../../utilities/catchAsync";
import { Request, Response, NextFunction } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utilities/sendResponse";
import httpStatus from "http-status";



const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;
    // const loginResult = await authService.loginUser(payload);
    const { accessToken, refreshToken } = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        data: { accessToken, refreshToken }
    })

})

export const AuthController = {
    loginUser
}