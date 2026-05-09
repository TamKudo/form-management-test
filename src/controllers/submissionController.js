const db = require('../database');
const { validateField } = require('../validators/fieldValidator');

exports.getActiveForms = (req, res) => {
    const forms = db.prepare(
        'SELECT * FROM forms WHERE status = ? ORDER BY "order" ASC'
    ).all('active');
    res.json({ success: true, data: forms });
};

exports.submitForm = (req, res) => {
    const form = db.prepare(
        'SELECT * FROM forms WHERE id = ? AND status = ?'
    ).get(req.params.id, 'active');

    if (!form) return res.status(404).json({
        success: false,
        message: 'Form không tồn tại hoặc chưa được kích hoạt'
    });

    const fields = db.prepare(
        'SELECT * FROM fields WHERE form_id = ? ORDER BY "order" ASC'
    ).all(req.params.id);

    const allErrors = [];
    for (const field of fields) {
        const errors = validateField(field, req.body[field.label]);
        allErrors.push(...errors);
    }

    if (allErrors.length > 0) return res.status(422).json({ success: false, errors: allErrors });

    db.prepare('INSERT INTO submissions (form_id, data) VALUES (?, ?)')
        .run(req.params.id, JSON.stringify(req.body));

    res.status(201).json({ success: true, message: 'Nộp form thành công' });
};

exports.getSubmissions = (req, res) => {
    const submissions = db.prepare(
        'SELECT * FROM submissions ORDER BY submitted_at DESC'
    ).all();
    res.json({ success: true, data: submissions.map(s => ({ ...s, data: JSON.parse(s.data) })) });
};