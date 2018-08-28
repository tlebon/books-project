const express = require('express');
const router = express.Router();
const Book = require('../models/book.js');


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/books', (req, res, next) => {
  Book.find()
    .then(books => {
      // console.log(books)
      res.render("books", { books });
    })
    .catch(err => {
      console.log(err)
    })
});
router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  console.log(bookId) //this breaks the promise if it comes befor the .then!
  Book.findOne({ '_id': bookId })
    .then(book => {
      res.render("book-detail", { book })
    })
    .catch(err => {
      console.log(err)
    })
});
router.get('/books/add', (req, res, next) => {
  res.render('book-add')
})
router.post('/books/add', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  const newBook = new Book({ title, author, description, rating })
  newBook.save()
    .then((book) => {
      res.redirect('/books')
    })
    .catch((error) => {
      console.log(error)
    })
});
router.get('/books/edit/:id', (req, res, next) => {
  res.render('book-edit/:id')
})

router.get('/books/delete/:id', (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then(result => {
      res.redirect('/books')
    })
    .catch(console.error)
})


router.post('/books/edit/:id', (req, res, next) => {
  const { title, author, description, rating } = req.body;

  Book.findByIdAndUpdate({ '_id': bookId })
    .then(book => {
      res.render("book-detail", { book })
        .catch((error) => {
          console.log(error)
        })
    });
})

module.exports = router;
