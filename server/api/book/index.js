var express = require('express');
var router = express.Router();

var controller = require('./book.controller');
var authService = require('../../auth/auth.service');

router.get('/',  controller.list);
// router.get('/', authService.isAuthenticated(), controller.list);
router.post('/', controller.create);

router.get('/:id', controller.show);
router.put('/:id', controller.update);

// router.delete('/:id', authService.hasRole('admin'), controller.destroy);
router.delete('/:id', controller.destroy);

module.exports = router;
