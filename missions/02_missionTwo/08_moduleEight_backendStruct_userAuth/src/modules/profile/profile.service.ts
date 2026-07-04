import { pool } from "../../db";
import bcrypt from "bcryptjs";

const createProfileIntoDB = async (payLoad: any) => {
  //   console.log(payLoad);
  const { user_id, bio, address, phone, gender, password } = payLoad;

  const hashPassword = await bcrypt.hash(password, 10);

  //   first check if the user exists
  const user = await pool.query(
    `
        SELECT * FROM users WHERE id = $1
    `,
    [user_id],
  );
  //   console.log(user);

  //check if the user exists
  if (user.rows.length === 0) {
    throw new Error("User does not exists");
  }

  const result = await pool.query(
    `
        INSERT INTO 
        profiles(user_id, bio, address, phone, gender,password)
        VAlUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
    `,
    [user_id, bio, address, phone, gender,hashPassword],
  );
  return result;
};

export const profileService = {
  createProfileIntoDB,
};
