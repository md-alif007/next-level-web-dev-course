import type { Request, Response } from "express";
import { profileService } from "./profile.service";

// post
const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileIntoDB(req.body);
    res.status(201).json({
      message: "profile created successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// get
const getProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.getProfileFromDB();
    res.status(201).json({
      message: "profile retrived successfully:)",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// get single profile
const getSingleProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await profileService.getSingleProfileFromDB(id as string);
    res.status(201).json({
      message: "profile retrived successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// update profile
const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { bio, address, gender, phone } = req.body;
  try {
    const result = await profileService.updateProfileIntoDB(
      req.body,
      id as string,
    );
    res.status(201).json({
      message: "profile updated successfully:)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// delete profile
const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await profileService.deleteProfileFromDB(id as string);
    res.status(201).json({
      message: "profile deleted successfully:)",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const profileController = {
  createProfile,
  getProfile,
  getSingleProfile,
  updateProfile,
  deleteProfile,
};
