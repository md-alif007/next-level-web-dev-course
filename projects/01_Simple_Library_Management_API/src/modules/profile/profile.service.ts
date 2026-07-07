import { pool } from "../../database";

const createProfileIntoDB = async (payLoad: any) => {
  const { user_id, bio, address, gender, phone } = payLoad;

  //   FIRST CHECK IF THE USER EXISTS
  const user = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [user_id],
  );
  if (user.rows.length === 0) {
    throw new Error("User not exists");
  }

  const result = await pool.query(
    `
        INSERT INTO 
        profile(user_id,bio,address,gender,phone)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
    [user_id, bio, address, gender, phone],
  );
  return result;
};

// get
const getProfileFromDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM profile
    `,
  );
  return result;
};

// get single profile
const getSingleProfileFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM profile WHERE id=$1
    `,
    [id],
  );
  return result;
};

// update profile
const updateProfileIntoDB = async (payLoad: any, id: string) => {
  const { bio, address, gender, phone } = payLoad;
  const result = await pool.query(
    `
    UPDATE profile SET
    bio = COALESCE ($1 , bio),
    address = COALESCE ($2 , address),
    gender = COALESCE ($3 , gender),
    phone = COALESCE ($4 , phone)
    WHERE id = $5
    RETURNING *
    `,
    [bio, address, gender, phone, id],
  );
  return result;
};

// delete profile
const deleteProfileFromDB = async (id: string) => {
  const result = pool.query(
    `
    DELETE FROM profile WHERE id = $1
    `,
    [id],
  );
  return result;
};

export const profileService = {
  createProfileIntoDB,
  getProfileFromDB,
  getSingleProfileFromDB,
  updateProfileIntoDB,
  deleteProfileFromDB,
};
