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
 *
 * /api/forms/{id}:
 *   get:
 *     summary: Lấy chi tiết form + fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thành công
 *       404:
 *         description: Form không tồn tại
 *   put:
 *     summary: Cập nhật form
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
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
 *       200:
 *         description: Cập nhật thành công
 *   delete:
 *     summary: Xóa form
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *
 * /api/forms/{id}/fields:
 *   post:
 *     summary: Thêm field vào form
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [text, number, date, color, select]
 *               order:
 *                 type: integer
 *               required:
 *                 type: boolean
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Thêm thành công
 *
 * /api/forms/{id}/fields/{fid}:
 *   put:
 *     summary: Cập nhật field
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: fid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *   delete:
 *     summary: Xóa field
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: fid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Xóa thành công
 *
 * /api/forms/active:
 *   get:
 *     summary: Danh sách form active cho nhân viên
 *     responses:
 *       200:
 *         description: Thành công
 *
 * /api/forms/{id}/submit:
 *   post:
 *     summary: Nhân viên nộp form
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Nộp thành công
 *       422:
 *         description: Dữ liệu không hợp lệ
 *
 * /api/submissions:
 *   get:
 *     summary: Xem danh sách bài đã nộp
 *     responses:
 *       200:
 *         description: Thành công
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