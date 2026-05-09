const router = require('express').Router();
const formController = require('../controllers/formController');
const fieldController = require('../controllers/fieldController');

/**
 * @swagger
 * /api/forms:
 *   get:
 *     summary: Lấy danh sách tất cả form (có phân trang)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang (mặc định 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số form mỗi trang (mặc định 10)
 *     responses:
 *       200:
 *         description: Thành công
 *   post:
 *     summary: Tạo form mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               order:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [active, draft]
 *     responses:
 *       201:
 *         description: Tạo thành công
 */
router.get('/', formController.getAllForms);
router.post('/', formController.createForm);
router.get('/:id', formController.getFormById);
router.put('/:id', formController.updateForm);
router.delete('/:id', formController.deleteForm);

router.post('/:id/fields', fieldController.addField);
router.put('/:id/fields/:fid', fieldController.updateField);
router.delete('/:id/fields/:fid', fieldController.deleteField);

module.exports = router;