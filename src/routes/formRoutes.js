const router = require('express').Router();
const formController = require('../controllers/formController');
const fieldController = require('../controllers/fieldController');

// Form CRUD
router.get('/', formController.getAllForms);
router.post('/', formController.createForm);
router.get('/:id', formController.getFormById);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);

// Field management
router.post('/:id/fields', fieldController.addField);
router.put('/:id/fields/:fid', fieldController.updateField);
router.delete('/:id/fields/:fid', fieldController.deleteField);

module.exports = router;