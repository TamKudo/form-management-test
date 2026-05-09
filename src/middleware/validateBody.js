module.exports = (req, res, next) => {
    if (['POST', 'PUT'].includes(req.method) && (!req.body || Object.keys(req.body).length === 0)) {
        return res.status(400).json({ success: false, message: 'Request body không được rỗng' });
    }
    next();
};