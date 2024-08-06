import jwt from 'jsonwebtoken';

function requireAuthenticationMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401);
        throw new Error('🚫 Un-Authorized 🚫');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload;
    } catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }
        // console.log(err,'Hoang123')
        throw new Error('🚫 Un-Authorized 🚫');
    }

    return next();
}

export default requireAuthenticationMiddleware

