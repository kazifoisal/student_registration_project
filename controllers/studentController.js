import students from '../models/studentModel.js';
import { unlink } from 'fs';

export function getProfile(req, res) {
    const student = students.find(s => s.id === req.user.id);
    res.send(student);
}

export function updateProfile(req, res) {
    const student = students.find(s => s.id === req.user.id);
    const { name, email } = req.body;
    if (student) {
        student.name = name || student.name;
        student.email = email || student.email;
        res.send('Profile updated');
    } else {
        res.status(404).send('Student not found');
    }
}

export function uploadFile(req, res) {
    res.send('File uploaded');
}

export function getFile(req, res) {
    const fileName = req.params.fileName;
    res.download(`uploads/${fileName}`);
}

export function deleteFile(req, res) {
    const fileName = req.params.fileName;
    unlink(`uploads/${fileName}`, (err) => {
        if (err) return res.status(500).send('File not found');
        res.send('File deleted');
    });
}
