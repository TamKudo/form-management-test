const db = require('../database');

const VALID_TYPES = ['text', 'number', 'date', 'color', 'select'];

// POST /api/forms/:id/fields - Thêm field vào form
exports.addField = (req, res) => {
    const form = db.prepare('SELECT id FROM forms WHERE id = ?').get(req.params.id);

    if (!form) {
        return res.status(404).json({ success: false, message: 'Form không tồn tại' });
    }

    const { label, type, order = 0, required = false, options } = req.body;

    if (!label) {
        return res.status(400).json({ success: false, message: 'label là bắt buộc' });
    }

    if (!VALID_TYPES.includes(type)) {
        return res.status(400).json({
            success: false,
            message: `type phải là một trong: ${VALID_TYPES.join(', ')}`
        });
    }

    if (type === 'select' && (!options || !Array.isArray(options) || options.length === 0)) {
        return res.status(400).json({
            success: false,
            message: 'type select cần có options là mảng không rỗng'
        });
    }

    const result = db.prepare(
        'INSERT INTO fields (form_id, label, type, "order", required, options) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(
        req.params.id,
        label,
        type,
        order,
        required ? 1 : 0,
        options ? JSON.stringify(options) : null
    );

    res.status(201).json({
        success: true,
        data: { id: result.lastInsertRowid, form_id: req.params.id, label, type, order, required, options }
    });
};

// PUT /api/forms/:id/fields/:fid - Cập nhật field
exports.updateField = (req, res) => {
    const field = db.prepare(
        'SELECT * FROM fields WHERE id = ? AND form_id = ?'
    ).get(req.params.fid, req.params.id);

    if (!field) {
        return res.status(404).json({ success: false, message: 'Field không tồn tại' });
    }

    const label = req.body.label ?? field.label;
    const type = req.body.type ?? field.type;
    const order = req.body.order ?? field.order;
    const required = req.body.required ?? field.required;
    const options = req.body.options ? JSON.stringify(req.body.options) : field.options;

    db.prepare(
        'UPDATE fields SET label = ?, type = ?, "order" = ?, required = ?, options = ? WHERE id = ?'
    ).run(label, type, order, required ? 1 : 0, options, req.params.fid);

    res.json({ success: true, message: 'Cập nhật field thành công' });
};

// DELETE /api/forms/:id/fields/:fid - Xóa field
exports.deleteField = (req, res) => {
    const result = db.prepare(
        'DELETE FROM fields WHERE id = ? AND form_id = ?'
    ).run(req.params.fid, req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({ success: false, message: 'Field không tồn tại' });
    }

    res.json({ success: true, message: 'Xóa field thành công' });
};