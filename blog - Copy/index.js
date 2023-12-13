// import dotenv from 'dotenv';
// Imports 
const methodOverride = require('method-override')
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
// Routes 
const articleRouter = require('./routes/articles');
const arabicarticleRouter = require('./routes/arabic-article');
const aboutRouter = require('./routes/about');
const aboutArabicRouter = require('./routes/arabic-about');
const apiRouter = require('./routes/api');
// Models 
const Article = require('./models/article');
const arabicArticle = require('./models/arabic-article');
const mongoose = require('mongoose'); 

const app = express();
dotenv.config();
app.set('view engine', 'ejs');
app.use(cors());
app.use(methodOverride('_method'))

// Database 
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    // family: 4;
    console.log('Connected to mongoDB.');
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

// Links 
app.get('/', (req, res) => {
  res.render('main');
});

app.use(express.urlencoded({ extended: false }));




// app.get('/api/blog-english', async (req, res) => {
//   try {
//     const article = await Article.find();
//     res.status(200).json(article);
//   } catch (err) {
//     next(err);
//   }
// });

// app.get('/api/blog-english', async (req, res) => {
//   try {
//     const article = await Article.find();
//     res.status(200).json(article);
//   } catch (err) {
//     next(err);
//   }
// });

// app.get('/api/blog-arabic', async (req, res) => {
//   try {
//     const article = await arabicArticle.find();
//     res.status(200).json(article);
//   } catch (err) {
//     next(err);
//   }
// });

app.listen(5000, () => {
  connect();
  console.log('connected to backend');
});

app.use('/articles', articleRouter); 
app.use('/about',aboutRouter ); 
app.use('/arabic-about',aboutArabicRouter ); 
app.use('/arabic-articles', arabicarticleRouter);
 app.use('/api',apiRouter);
