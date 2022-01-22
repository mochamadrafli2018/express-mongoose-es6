const express = require('express');
const router = express.Router();

// create new data
router.post('/', require('../controllers/crud/create.js').save);

// read all data
router.get('/', require('../controllers/crud/read.js').find);

// read data by id
router.get('/:id', require('../controllers/crud/readbyid.js').findById);

// update data by id
router.put('/:id', require('../controllers/crud/update.js').findOneAndUpdate);

// delete data by id
router.delete('/:id', require('../controllers/crud/delete.js').findByIdAndRemove);

// delete all data
router.delete('/', require('../controllers/crud/deleteall.js').remove);

module.exports = router;