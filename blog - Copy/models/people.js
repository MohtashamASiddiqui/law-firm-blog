const mongoose = require('mongoose');
const { marked } = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, position: {
        type: String,
        required: true,
    },
    image:{
        data:Buffer,
        contentType:String
    },
    markdown: {
        type: String,
        required: true,
    }, sanitizedHtml: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    }, educationSanitizedHtml: {
        type: String,
        required: true,
    },
    admission: {
        type: String,
        required: true,
    }, admissionSanitizedHtml: {
        type: String,
        required: true,
    },
})

peopleSchema.pre('validate', function (next) {


    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    if (this.education) {
        this.educationSanitizedHtml = dompurify.sanitize(marked(this.markdown));
    }

    next();
});

module.exports = mongoose.model('About', peopleSchema);