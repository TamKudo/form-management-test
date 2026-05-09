module.exports = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        error: {
            code: err.status || 500,
            message: err.message || 'Lỗi server nội bộ'
        }
    });
};