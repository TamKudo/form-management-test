const router = require('express').Router();
const submissionController = require('../controllers/submissionController');

router.get('/active', submissionController.getActiveForms);
router.post('/:id/submit', submissionController.submitForm);

module.exports = router;