import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import students from '../models/studentModel.js';

const { sign } = jwt;
const { hash, compare } = bcrypt;
const JWT_SECRET = 'your_jwt_secret';

export async function register(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    students.push({ id: students.length + 1, name, email, password: hashedPassword });
    res.status(201).send('User registered');
}

export async function login(req, res) {
    const { email, password } = req.body;
    const student = students.find(s => s.email === email);
    if (student && await compare(password, student.password)) {
        const token = sign({ id: student.id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
}
