const express = require('express');
const cors = require('cors');
require('./database'); // khởi tạo database khi server start

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/forms', require('./routes/submissionRoutes')); // /active phải đứng trước /:id
app.use('/api/forms', require('./routes/formRoutes'));
app.get('/api/submissions', require('./controllers/submissionController').getSubmissions);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Không tìm thấy route: ${req.path}` });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Lỗi server nội bộ' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server chạy tại http://localhost:${PORT}`);
});