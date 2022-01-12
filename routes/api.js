const express = require('express');
const router = express.Router();

// router create, read, update and delete
router.post('/', require('../controller/create.js').save);
router.get('/', require('../controller/read.js').find);
router.get('/:id', require('../controller/readbyid.js').findById);
router.put('/:id', require('../controller/update.js').findOneAndUpdate);
router.delete('/:id', require('../controller/delete.js').findByIdAndRemove);
router.delete('/', require('../controller/deleteall.js').remove);

module.exports = router;