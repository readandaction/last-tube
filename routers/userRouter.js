import express from "express";
import routes from "../routes";
import { home } from "../controllers/videoControllers";
import {
  getEditProfile,
  postEditProfile,
  userDetail,
  changePassword,
} from "../controllers/userControllers";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.home, home);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
