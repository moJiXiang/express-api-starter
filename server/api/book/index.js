var express = require('express');
var router = express.Router();

var controller = require('./book.controller');

router.get('/', controller.list);
router.post('/', controller.create);

router.get('/:id', controller.show);
router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);



module.exports = router;
