const express = require('express');
const app = express();
app.use(express.json());
const port = 3400;
const bmController = require('./controllers/book.management.controller')

app.post('/book', bmController.addBookController)
app.delete('/book/:id', bmController.deleteBookController)
app.put('/book/:id', bmController.updateBookController)

app.listen(port, () => {
    console.log(`BMS server started on port ${port}`);
  });