const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const fileUpload = require('express-fileupload');

mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb+srv://Rabyn:moles@cluster0.q1x9les.mongodb.net/Blogs?retryWrites=true&w=majority', (err) => {
    if (err) {

    }
    app.listen(5000);
  })

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, multipart/form-data');
  next();
});


app.use(fileUpload({
  createParentPath: true,
  // abortOnLimit: true,
  // limits: 1000000
}));
app.use(userRoutes);
app.use(postRoutes);



app.use((req, res) => {
  res.status(404).json({
    status: 400,
    message: 'not found'
  });
})