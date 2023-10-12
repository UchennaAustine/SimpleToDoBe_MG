import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../model/userModel";
import { streamUpload } from "../utils/imageStream";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password, name } = req.body;

    const lock = await bcrypt.genSalt(10);
    const encrypt = await bcrypt.hash(password, lock);

    const { secure_url, public_id }: any = streamUpload(req);

    const User = await userModel.create({
      email,
      name,
      password: encrypt,
      avatar: secure_url,
      avatarID: public_id,
    });

    return res.status(201).json({
      message: `${User?.name} account have being created`,
      data: User,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const signInUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const User = await userModel.findOne({ email });

    if (User) {
      const checkPoint = await bcrypt.compare(password, User.password);

      if (checkPoint) {
        return res.status(201).json({
          message: "view one",
          data: User,
        });
      } else {
        return res.status(404).json({
          message: "Error with password",
        });
      }
    } else {
      return res.status(404).json({
        message: "Error with User",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const User = await userModel.find().sort({ createdAt: -1 });

    return res.status(201).json({
      message: "created",
      data: User,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const getAUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { UserID } = req.params;

    const User = await userModel.findById(UserID);

    return res.status(201).json({
      message: "view one",
      data: User,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { UserID } = req.params;
    const { HouseAddress, gender, phoneNumber } = req.body;

    const User = await userModel.findByIdAndUpdate(
      UserID,
      {
        HouseAddress,
        gender,
        phoneNumber,
      },
      { new: true }
    );

    return res.status(201).json({
      message: "view one",
      data: User,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
