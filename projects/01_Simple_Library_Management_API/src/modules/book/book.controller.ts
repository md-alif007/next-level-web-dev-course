import type { Request, Response } from "express";
import { bookService } from "./book.service";

// post method
const postBook = async (req: Request, res: Response) => {
  const { title, author, genre, published_year, available } = req.body;
  try {
    const result = await bookService.postBookIntoDB(req.body);
    res.status(201).json({
      message: "book created successfully :)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// get method
const getBook = async (req: Request, res: Response) => {
  try {
    const result = await bookService.getBookFromDB();
    res.status(201).json({
      message: "books retrived successfully :)",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// get single Book
const getSingleBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await bookService.getSingleBookFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "book not found:(",
        data: {},
      });
    }
    res.status(201).json({
      message: "book retrived successfully :)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// put method
const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, genre, published_year, available } = req.body;
  try {
    const result = await bookService.updateBookFromDB(req.body, id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        message: "book not found:(",
        data: {},
      });
    }
    res.status(201).json({
      message: "book updated successfully :)",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// delete method
const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await bookService.deleteBookFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        message: "user not found:(",
        data: {},
      });
    }
    res.status(201).json({
      message: "book delete successfully :)",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

export const bookController = {
  postBook,
  getBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
