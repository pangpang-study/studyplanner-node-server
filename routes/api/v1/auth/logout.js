// TODO Invalidate JWT Token 구현
const logout = (req, res) => {
    req.logout();
    return res.status(200).json({
        success: true,
        code: 200,
    });
};

module.exports = logout;
