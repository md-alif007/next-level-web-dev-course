import { Router } from "express";
import { bookController } from "./book.controller";

const router = Router();

// post method
router.post("/", bookController.postBook);

// get method
router.get("/", bookController.getBook);

// get single Book
router.get("/:id", bookController.getSingleBook);

// put method
router.put("/:id", bookController.updateBook);

// delete method
router.delete("/:id", bookController.deleteBook);

export const bookRoute = router;
