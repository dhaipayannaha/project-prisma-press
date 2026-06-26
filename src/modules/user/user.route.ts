import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/register", UserController.registerUser)
router.get("/me", UserController.getMyProfile)


export const userRoutes = router;
