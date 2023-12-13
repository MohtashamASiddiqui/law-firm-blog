const express = require('express');
const router = express.Router();
const About = require('./../models/arabic-about');

router.get('/', async (req, res) => {
    const abouts = await About.find();

    res.render('arabic-about/index', { abouts: abouts });
});

router.get('/new', (req, res) => {
    res.render('arabic-about/new', { about: new About() });
});

router.post(
    '/',
    async (req, res, next) => {
        req.about = new About();
        next();
    },
    saveArticleAndRedirect('new')
);

router.put(
    '/:id',
    async (req, res, next) => {
        req.about = await About.findById(req.params.id);
        next();
    },
    saveArticleAndRedirect('edit')
);

// router.get('/edit/:id', async (req, res) => {
//     const about = await About.findById(req.params.id);
//     res.render('about/new', { about: about });
//   });

router.delete('/:id', async (req, res) => {
    await About.findByIdAndDelete(req.params.id);
});

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let about = req.about;
        about.markdown = req.body.markdown;
        try {
            about = await about.save();
            res.redirect(`/arabic-about/${path}`);
        } catch (e) {
            res.render(`/arabic-about/${path}`, { about: about });
        }
    };
}


module.exports = router;