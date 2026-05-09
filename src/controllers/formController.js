const db = require('../database');

exports.getAllForms = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const total = db.prepare('SELECT COUNT(*) as count FROM forms').get().count;
    const forms = db.prepare('SELECT * FROM forms ORDER BY "order" ASC LIMIT ? OFFSET ?').all(limit, offset);

    res.json({ success: true, data: forms, pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } });
};

exports.createForm = (req, res) => {
    const { title, description, order = 0, status = 'draft' } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'title là bắt buộc' });
    if (!['active', 'draft'].includes(status)) return res.status(400).json({ success: false, message: 'status phải là active hoặc draft' });

    const result = db.prepare('INSERT INTO forms (title, description, "order", status) VALUES (?, ?, ?, ?)').run(title, description, order, status);
    res.status(201).json({ success: true, data: { id: result.lastInsertRowid, title, description, order, status } });
};

exports.getFormById = (req, res) => {
    const form = db.prepare('SELECT * FROM forms WHERE id = ?').get(req.params.id);
    if (!form) return res.status(404).json({ success: false, message: 'Form không tồn tại' });

    const fields = db.prepare('SELECT * FROM fields WHERE form_id = ? ORDER BY "order" ASC').all(req.params.id);
    res.json({ success: true, data: { ...form, fields } });
};

exports.updateForm = (req, res) => {
    const form = db.prepare('SELECT * FROM forms WHERE id = ?').get(req.params.id);
    if (!form) return res.status(404).json({ success: false, message: 'Form không tồn tại' });

    const title = req.body.title ?? form.title;
    const description = req.body.description ?? form.description;
    const order = req.body.order ?? form.order;
    const status = req.body.status ?? form.status;

    if (!['active', 'draft'].includes(status)) return res.status(400).json({ success: false, message: 'status phải là active hoặc draft' });

    db.prepare('UPDATE forms SET title = ?, description = ?, "order" = ?, status = ? WHERE id = ?').run(title, description, order, status, req.params.id);
    res.json({ success: true, message: 'Cập nhật form thành công' });
};

exports.deleteForm = (req, res) => {
    const result = db.prepare('DELETE FROM forms WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ success: false, message: 'Form không tồn tại' });
    res.json({ success: true, message: 'Xóa form thành công' });
};