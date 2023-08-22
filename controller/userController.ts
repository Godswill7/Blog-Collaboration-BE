import { Request, Response } from "express";
import { HTTP, mainError } from "../error/mainError";
import cloudinary from "../utils/cloudinary";
import bcrypt from "bcrypt";
import userModel from "../model/userModel";

export const registerUser = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { password, email, name } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path
    );

    const user = await userModel.create({
      name,
      email,
      password: hashed,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(HTTP.CREATE).json({
      message: "Created",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: "This Error is came as a result of you creating this User!!!",
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error"
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      const checked = await bcrypt.compare(password, user.password!);

      if (checked) {
        return res.status(HTTP.CREATE).json({
          message: `welcome back ${user.name}`,
          data: user._id,
        });
      } else {
        new mainError({
          name: "Invalid Password Error",
          message: `User Password is not correct`,
          status: HTTP.BAD,
          success: false,
        });

        return res
          .status(HTTP.BAD)
          .json({ message: "User Password is not correct" });
      }
    } else {
      new mainError({
        name: "Invalid User Error",
        message: `User can't be found in our Database`,
        status: HTTP.BAD,
        success: false,
      });

      return res
        .status(HTTP.BAD)
        .json({ message: "User can't be found in our Database" });
    }
  } catch (error) {
    new mainError({
      name: "Create Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error"
    });
  }
};

export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user:any = await userModel.find();

    return res.status(HTTP.OK).json({
      message: `${user.name} found `,
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "GET Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({ message: "Error" });
  }
};

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const user = await userModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: "found",
      data: user,
    });
  } catch (error) {
    new mainError({
      name: "GET Error",
      message: `This Error is came as a result of you creating this User!!!`,
      status: HTTP.BAD,
      success: false,
    });

    return res.status(HTTP.BAD).json({
      message: "Error"
    });
  }
};
