const bookModel = require("./../models/books");

const getBookList = async (_, res) => {
  let data = [];
  let books = [];
  try {
    data = await bookModel.find();
    console.log(data);
    data.forEach((book) => {
      books.push({
        name: book.name,
        author: book.author,
        genre: book.genre,
        id: book._id,
      });
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log(books);
    res.render("bookList", { books: books });
  }
};

const getBook = (_, res) => {
  res.render("addBooks");
};

const deleteBook = async (req, res) => {
  try {
    await bookModel.deleteOne({ _id: req.params.id });
    res.json({ status: "successful" });
  } catch (error) {
    console.error(error);
    res.json({ status: "failed" });
  }
};

const postBook = (req, res) => {
  const data = new bookModel({
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
  });
  data
    .save()
    .then(() => {
      console.log("Data Saved Successfully!");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      res.redirect("/books");
    });
};

const getEditBook = async (req, res) => {
  const book = await bookModel.findById(req.params.id);
  res.render("editBook", {
    id: req.params.id,
    name: book.name,
    genre: book.genre,
    author: book.author,
  });
};

const editBook = async (req, res) => {
  const { name, author, genre } = req.body;
  var data = {};
  data = name ? { ...data, name } : data;
  data = author ? { ...data, author } : data;
  data = genre ? { ...data, genre } : data;
  console.log(data);
  try {
    await bookModel.findByIdAndUpdate(req.params.id, {
      ...data,
    });
  } catch (error) {
    console.error(error);
  }
  res.redirect("/book-list");
};

module.exports = {
  getBookList,
  getBook,
  postBook,
  deleteBook,
  editBook,
  getEditBook,
};
