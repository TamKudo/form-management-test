const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
require('./database');

const validateBody = require('./middleware/validateBody');
const errorHandler = require('./middleware/errorHandler');
const swaggerSpec = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(validateBody);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/forms', require('./routes/submissionRoutes'));
app.use('/api/forms', require('./routes/formRoutes'));
app.get('/api/submissions', require('./controllers/submissionController').getSubmissions);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Không tìm thấy route: ${req.path}` });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
    console.log(`API Docs tại http://localhost:${PORT}/api-docs`);
});