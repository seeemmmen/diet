const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключаем статику из папки dist
app.use(express.static(path.join(__dirname, 'dist')));

mongoose.connect('mongodb+srv://seeemmmen:Parol2017@web.omhac.mongodb.net/users?retryWrites=true&w=majority&appName=Web');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    answers: { type: Object, default: {} } // Поле для хранения ответов
});

const User = mongoose.model('User', userSchema, 'custom_users');
app.use(express.json());

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};

app.post('/api/register', async (req, res) => {
    try {
        console.log(req.body);
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await newUser.save();
        // Генерируем токен сразу после регистрации
        const token = jwt.sign({ email: newUser.email }, 'secret');
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email }, 'secret');
        res.status(200).json({ token, message: 'Logged in successfully ' + user.username });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Маршрут для сохранения ответов
app.post('/api/answers', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Обновляем поле answers, добавляя новый ответ
        user.answers = { ...user.answers, ...req.body };
        await user.save();

        res.status(200).json({ message: 'Answer saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to my User Registration and Login API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});