const express = require('express');
const router = express.Router();
// Models 
const Article = require('./../models/article');
const arabicArticle = require('./../models/arabic-article');
const About = require('./../models/about');

router.get('/blog-english', async (req, res) => {
    try {
      const article = await Article.find();
      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  });
  
  router.get('/about', async (req, res) => {
    try {
      const about = await About.find();
      res.status(200).json(about);
    } catch (err) {
      next(err);
    }
  });
  router.get('/blog-arabic', async (req, res) => {
    try {
      const article = await arabicArticle.find();
      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  });

  router.get('/blog-arabic', async (req, res) => {
    try {
      const article = await arabicArticle.find();
      res.status(200).json(article);
    } catch (err) {
      next(err);
    }
  });


module.exports = router;