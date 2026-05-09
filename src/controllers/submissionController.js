const db = require('../database');
const { validateField } = require('../validators/fieldValidator');

// GET /api/forms/active - Danh sách form active cho nhân viên
exports.getActiveForms = (req, res) => {
    const forms = db.prepare(
        'SELECT * FROM forms WHERE status = ? ORDER BY "order" ASC'
    ).all('active');

    res.json({ success: true, data: forms });
};

// POST /api/forms/:id/submit - Nhân viên nộp form
exports.submitForm = (req, res) => {
    const form = db.prepare(
        'SELECT * FROM forms WHERE id = ? AND status = ?'
    ).get(req.params.id, 'active');

    if (!form) {
        return res.status(404).json({
            success: false,
            message: 'Form không tồn tại hoặc chưa được kích hoạt'
        });
    }

    const fields = db.prepare(
        'SELECT * FROM fields WHERE form_id = ? ORDER BY "order" ASC'
    ).all(req.params.id);

    // Validate từng field
    const allErrors = [];
    for (const field of fields) {
        const value = req.body[field.label];
        const errors = validateField(field, value);
        allErrors.push(...errors);
    }

    if (allErrors.length > 0) {
        return res.status(422).json({ success: false, errors: allErrors });
    }

    // Lưu submission
    db.prepare('INSERT INTO submissions (form_id, data) VALUES (?, ?)')
        .run(req.params.id, JSON.stringify(req.body));

    res.status(201).json({ success: true, message: 'Nộp form thành công' });
};

// GET /api/submissions - Xem danh sách bài đã submit
exports.getSubmissions = (req, res) => {
    const submissions = db.prepare(
        'SELECT * FROM submissions ORDER BY submitted_at DESC'
    ).all();

    const data = submissions.map(s => ({
        ...s,
        data: JSON.parse(s.data)
    }));

    res.json({ success: true, data });
};