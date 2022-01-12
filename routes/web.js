const express = require('express');
const router = express.Router();
const Schema = require('../model/data.schema.js');

router.get('/', (req, res) => { 
    Schema.find()
    .then((data) => {
        res.render('index.ejs', {data: data});
    })
    .catch((err) => {
        console.log(err);
    })
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard.ejs', {})} 
);

module.exports = router;