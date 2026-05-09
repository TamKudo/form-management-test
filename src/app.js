const express = require('express');
const cors = require('cors');
require('./database');

const validateBody = require('./middleware/validateBody');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(validateBody); // kiểm tra body trước khi vào route

// Routes
app.use('/api/forms', require('./routes/submissionRoutes'));
app.use('/api/forms', require('./routes/formRoutes'));
app.get('/api/submissions', require('./controllers/submissionController').getSubmissions);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Không tìm thấy route: ${req.path}` });
});

// Error handler — phải đứng cuối cùng
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
});