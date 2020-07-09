import express from "express";
import routes from "../routes";
import { home } from "../controllers/videoControllers";
import {
  editProfile,
  userDetail,
  changePassword,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get(routes.home, home);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.changePassword, changePassword);

export default userRouter;
