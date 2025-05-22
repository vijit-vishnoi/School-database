const express = require('express');
const router = express.Router();
const controller = require('../controllers/schoolController');

router.post('/addSchool', controller.create);
router.get('/listSchools', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
