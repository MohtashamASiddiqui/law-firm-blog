const express = require('express');
const router = express.Router();
const Article = require('./../models/arabic-article');

router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ date: 'desc' });

    res.render('arabic-articles/index', { articles: articles });
});

router.get('/new', (req, res) => {
    res.render('arabic-articles/new', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('arabic-articles/new', { article: article });
});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) res.redirect('/');
    res.render('arabic-articles/show', { article: article });
});

router.post(
    '/',
    async (req, res, next) => {
        req.article = new Article();
        next();
    },
    saveArticleAndRedirect('new')
);

router.put(
    '/:id',
    async (req, res, next) => {
        req.article = await Article.findById(req.params.id);
        next();
    },
    saveArticleAndRedirect('edit')
);
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.description = req.body.description;
        article.date = req.body.date;
        article.markdown = req.body.markdown;
        article.people1 = req.body.people1;
        article.people2 = req.body.people2;
        article.people3 = req.body.people3;
        try {
            article = await article.save();
            res.redirect(`/arabic-articles/${article.slug}`);
        } catch (e) {
            res.render(`arabic-articles/${path}`, { article: article });
        }
    };
}

module.exports = router;
