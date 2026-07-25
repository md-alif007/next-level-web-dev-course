import { pool } from "../../database/db";

const postProfilesIntoDB = async (payLoad: any) => {
  const { user_id, bio, address, phone, gender } = payLoad;
  const result = await pool.query(
    `
        INSERT INTO profiles(user_id, bio, address, phone, gender)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
    [user_id, bio, address, phone, gender],
  );
  return result;
};

// get method
const getProfiles = async () => {
  const result = await pool.query(
    `
    SELECT * FROM profiles
    `,
  );
  return result;
};

// get single method
const getSingleProfileFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM profiles WHERE id = $1
    `,
    [id],
  );
  return result;
};

// put method
const updateProfilesIntoDB = async (id: string, payLoad: any) => {
  // const { id } = req.params;
  const { user_id, bio, address, phone, gender } = payLoad;

  const result = await pool.query(
    `
    UPDATE profiles SET
    user_id = COALESCE ($1 , user_id),
    bio = COALESCE ($2 , bio),
    address = COALESCE ($3 , address),
    phone = COALESCE ($4,phone),
    gender = COALESCE($5 , gender)
    WHERE id = $6
    RETURNING *    
    `,
    [user_id, bio, address, phone, gender, id],
  );
  return result;
};

// delete method
const deleteProfileFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM profiles WHERE id = $1
    `,
    [id],
  );
  return result;
};

export const profilesService = {
  postProfilesIntoDB,
  getProfiles,
  updateProfilesIntoDB,
  getSingleProfileFromDB,
  deleteProfileFromDB,
};
