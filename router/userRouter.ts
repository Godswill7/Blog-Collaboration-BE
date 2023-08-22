import express from "express";
import {
  getUser,
  getUsers,
  registerUser,
  signInUser,
} from "../controller/userController";
import { upload } from "../utils/multer";

const router = express.Router();

router.route("/register").post(upload, registerUser);

router.route("/sign-in").post(signInUser);
router.route("/get-user").get(getUsers);

router.route("/:userID/get-user").get(getUser);

export default router;
