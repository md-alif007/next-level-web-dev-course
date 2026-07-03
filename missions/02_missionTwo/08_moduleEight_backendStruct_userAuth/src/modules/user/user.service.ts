import { pool } from "../../db"
import type { IUser } from "./user.interface";

// [post method]
const createUserIntoDB = async (payload: IUser) => {

    const { name, email, password, age } = payload;

    const result = await pool.query(
        `
            INSERT INTO 
            users(name ,email ,password ,age)
            VALUES($1,$2,$3,$4)
            RETURNING *
        `, [name, email, password, age]
    );
    return result;
    // console.log(result)
}

// [gett method]
const getAllUsersFromDB = async () => {
    const result = await pool.query(
        `
            SELECT * FROM users 
        `
    );
    return result;
}

// [gett method - single user]
const getSinglUsersFromDB = async (id: string) => {
    const result = await pool.query(
        `
            SELECT * FROM users WHERE id = $1 
        `, [id]
    );
    return result;
}

// [putt method]
const updateUserFromDB = async (payload: IUser, id: string) => {

    const { name, password, age, is_active } = payload;

    const result = await pool.query(
        `
        UPDATE users 
        SET name = COALESCE ($1, name), 
        password = COALESCE ($2,password),
        age = COALESCE ($3,age),
        is_active = COALESCE ($4,is_active)
        WHERE id = $5 
        RETURNING *
        `, [name, password, age, is_active, id]
    );
    return result;
}

// [delete method]
const deleteUserFromDB = async (id : string) => {
    const result = await pool.query(
        `
            DELETE FROM users WHERE id = $1
        `, [id]
    );
    return result;
}

export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSinglUsersFromDB,
    updateUserFromDB,
    deleteUserFromDB
}