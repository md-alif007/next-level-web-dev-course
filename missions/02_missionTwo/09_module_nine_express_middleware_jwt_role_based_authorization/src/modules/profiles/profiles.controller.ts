import type { Request, Response } from "express";
import { profilesService } from "./profiel.service";

// post method
const postProfiles = async (req: Request, res: Response) => {
  const { user_id, bio, address, phone, gender } = req.body;

  try {
    const result = await profilesService.postProfilesIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "profile created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// get method
const getProfiles = async (req: Request, res: Response) => {
  try {
    const result = await profilesService.getProfiles();

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "profiles retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// get single profile
const getSingleProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await profilesService.getSingleProfileFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "single profile retrived",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// put method
const updateProfiles = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id, bio, address, phone, gender } = req.body;

  try {
    const result = await profilesService.updateProfilesIntoDB(
      id as string,
      req.body,
    );

    if (result.rows.length === 0) {
      res.status(500).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "profile updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

// delete method
const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await profilesService.deleteProfileFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "user not found",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "profile deleted successfully",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const profilesController = {
  postProfiles,
  getProfiles,
  updateProfiles,
  getSingleProfile,
  deleteProfile,
};
