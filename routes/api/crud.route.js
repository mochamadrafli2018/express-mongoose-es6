const express = require('express');
const router = express.Router();

// create
router.post('/', require('../../controller/crud/create.js').save);
// read
router.get('/', require('../../controller/crud/read.js').find);
router.get('/:id', require('../../controller/crud/readbyid.js').findById);
// update
router.put('/:id', require('../../controller/crud/update.js').findOneAndUpdate);
// delete
router.delete('/:id', require('../../controller/crud/delete.js').findByIdAndRemove);
router.delete('/', require('../../controller/crud/deleteall.js').remove);

module.exports = router;