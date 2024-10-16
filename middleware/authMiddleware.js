import jwt from 'jsonwebtoken';
const { verify } = jwt;
const JWT_SECRET = '98754fdjyg57788';

export function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(403).send('Access denied');
    
    verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');
        req.user = decoded;
        next();
    });
}
