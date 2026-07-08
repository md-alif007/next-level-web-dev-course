import { pool } from "../../database";

// post method
const postBookIntoDB = async (payLoad: any) => {
  const { title, author, genre, published_year, available } = payLoad;
  const result = await pool.query(
    `
    INSERT INTO 
    books(title, author, genre, published_year, available)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [title, author, genre, published_year, available],
  );
  return result;
};

// get method
const getBookFromDB = async () => {
  const result = await pool.query(
    `
    SELECT * FROM books
    `,
  );
  return result;
};

// get single Book
const getSingleBookFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM books WHERE id = $1
    `,
    [id],
  );
  return result;
};

// put method
const updateBookFromDB = async (payLoad: any, id: string) => {
  const { title, author, genre, published_year, available } = payLoad;
  const result = await pool.query(
    `
    UPDATE books SET
    title = COALESCE($1,title),
    author = COALESCE($2,author),
    genre = COALESCE($3,genre),
    published_year = COALESCE($4,published_year),
    available = COALESCE($5,available)
    WHERE
    id = $6
    RETURNING *
    `,
    [title, author, genre, published_year, available, id],
  );
  return result;
};

// delete method
const deleteBookFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM books WHERE id =$1
    `,
    [id],
  );
  return result;
};

export const bookService = {
  postBookIntoDB,
  getBookFromDB,
  getSingleBookFromDB,
  updateBookFromDB,
  deleteBookFromDB
};
