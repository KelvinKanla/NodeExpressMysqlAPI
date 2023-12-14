const express = require('express');
const app = express();
app.use(express.json());
const port = 3400;

const bookController = require('./controllers/book.controller')
const userController = require('./controllers/user.controller')
const borrowerController = require('./controllers/borrower.controller')
const authorController = require('./controllers/author.controller')

app.post('/book', bookController.addBookController)
app.delete('/book/:id', bookController.deleteBookController)
app.put('/book/:id', bookController.updateBookController)

app.post('/user', userController.addUserController)
app.delete('/user/:id', userController.deleteUserController)
app.put('/user/:id', userController.updateUserController)

app.post('/borrower', borrowerController.addBorrowerController)
app.delete('/borrower/:id', borrowerController.deleteBorrowerController)
app.put('/borrower/:id', borrowerController.updateBorrowerController)

app.post('/author', authorController.addAuthorController)
app.delete('/author/:id', authorController.deleteAuthorController)
app.put('/author/:id', authorController.updateAuthorController)

app.listen(port, () => {
  console.log(`BMS server started on port ${port}`);
});