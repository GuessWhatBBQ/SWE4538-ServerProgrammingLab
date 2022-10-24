const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const bookController = require("./controllers/bookController");

router.get("/", homeController.getHome);
router.get("/book-list", bookController.getBookList);
router.get("/books", bookController.getBook);
router.post("/books", bookController.postBook);
router.post("/books/delete/:id", bookController.deleteBook);
router.get("/books/edit/:id", bookController.getEditBook);
router.post("/books/edit/:id", bookController.editBook);

module.exports = router;
