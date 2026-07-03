import type { Request, Response } from "express";
import { userService } from "./user.service";

// [post method]
const createUser = async (req: Request, res: Response) => {
    // console.log(req.body)
    const { name, email, password, age } = req.body

    try {
        const result = await userService.createUserIntoDB(req.body)

        res.status(201).json({
            message: "user created successfully! :)",
            data: result.rows[0]
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        });
    }
}

// [gett method]
const getAllUsers = async (req: Request, res: Response) => {

    try {
        const result = await userService.getAllUsersFromDB()

        res.status(200).json({
            success: true,
            message: "users retrived successfully! :)",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

// [gett method - single user]
const getSinglUsers = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await userService.getSinglUsersFromDB(id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: " user not found! :( ",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "user retrived successfully! :)",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

// [putt method]
const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;

    try {

        const result = await userService.updateUserFromDB(req.body, id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: " user not found! :( ",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "user updated successfully! :)",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }

}

// [delete method]
const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        const result = await userService.deleteUserFromDB(id as string);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: " user not found! :( ",
                data: {}
            })
        }

        res.status(200).json({
            success: true,
            message: "user deleted successfully! :)",
            data: {}
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSinglUsers,
    updateUser,
    deleteUser
}