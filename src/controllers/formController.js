const db = require('../database');

// GET /api/forms - Lấy danh sách tất cả form
exports.getAllForms = (req, res) => {
    const forms = db.prepare('SELECT * FROM forms ORDER BY "order" ASC').all();
    res.json({ success: true, data: forms });
};

// POST /api/forms - Tạo form mới
exports.createForm = (req, res) => {
    const { title, description, order = 0, status = 'draft' } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'title là bắt buộc' });
    }

    if (!['active', 'draft'].includes(status)) {
        return res.status(400).json({ success: false, message: 'status phải là active hoặc draft' });
    }

    const result = db.prepare(
        'INSERT INTO forms (title, description, "order", status) VALUES (?, ?, ?, ?)'
    ).run(title, description, order, status);

    res.status(201).json({
        success: true,
        data: { id: result.lastInsertRowid, title, description, order, status }
    });
};

// GET /api/forms/:id - Lấy chi tiết 1 form kèm danh sách fields
exports.getFormById = (req, res) => {
    const form = db.prepare('SELECT * FROM forms WHERE id = ?').get(req.params.id);

    if (!form) {
        return res.status(404).json({ success: false, message: 'Form không tồn tại' });
    }

    const fields = db.prepare(
        'SELECT * FROM fields WHERE form_id = ? ORDER BY "order" ASC'
    ).all(req.params.id);

    res.json({ success: true, data: { ...form, fields } });
};

// PUT /api/forms/:id - Cập nhật form
exports.updateForm = (req, res) => {
    const form = db.prepare('SELECT * FROM forms WHERE id = ?').get(req.params.id);

    if (!form) {
        return res.status(404).json({ success: false, message: 'Form không tồn tại' });
    }

    const title = req.body.title ?? form.title;
    const description = req.body.description ?? form.description;
    const order = req.body.order ?? form.order;
    const status = req.body.status ?? form.status;

    if (!['active', 'draft'].includes(status)) {
        return res.status(400).json({ success: false, message: 'status phải là active hoặc draft' });
    }

    db.prepare(
        'UPDATE forms SET title = ?, description = ?, "order" = ?, status = ? WHERE id = ?'
    ).run(title, description, order, status, req.params.id);

    res.json({ success: true, message: 'Cập nhật form thành công' });
};

// DELETE /api/forms/:id - Xóa form
exports.deleteForm = (req, res) => {
    const result = db.prepare('DELETE FROM forms WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({ success: false, message: 'Form không tồn tại' });
    }

    res.json({ success: true, message: 'Xóa form thành công' });
};