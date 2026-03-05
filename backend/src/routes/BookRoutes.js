/* Sean Clarke
    c0561639
    10/28/2025
*/
import { Router } from "express";
import { listBooks, getBook, createBook, updateBook, deleteBook } from "../controllers/BookController.js";

//CRUD operations
const router = Router();
router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
