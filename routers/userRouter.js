import express from "express";
import routes from "../routes";
import { home } from "../controllers/videoControllers";
import {
  editProfile,
  userDetail,
  changePassword,
} from "../controllers/userControllers";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.home, home);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
