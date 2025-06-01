const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

mongoose.connect('mongodb+srv://seeemmmen:Parol2017@web.omhac.mongodb.net/users?retryWrites=true&w=majority&appName=Web')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    name: { type: String, default: "Write please" },
    phone: { type: String, default: "Write please" },
    answers: { type: Object, default: {} }
});

const progressSchema = new mongoose.Schema({
    userEmail: String,
    fat: Number,
    protein: Number,
    carbs: Number,
    calories: Number,
    date: { type: Date, default: Date.now }
});

const mealSchema = new mongoose.Schema({
    userEmail: String,
    name: String,
    calories: Number,
    image: String,
    date: { type: Date, default: Date.now }
});

const waterSchema = new mongoose.Schema({
    userEmail: String,
    count: Number,
    date: { type: Date, default: Date.now }
});

const activitySchema = new mongoose.Schema({
    userEmail: String,
    day: String,
    value: Number,
    date: { type: Date, default: Date.now }
});

const healthGoalsSchema = new mongoose.Schema({
    userEmail: String,
    current: {
        weight: { type: String, default: "Write please" },
        water: { type: String, default: "Write please" },
        calories: { type: String, default: "Write please" }
    },
    target: {
        weight: { type: String, default: "Write please" },
        water: { type: String, default: "Write please" },
        calories: { type: String, default: "Write please" }
    },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema, 'custom_users');
const Progress = mongoose.model('Progress', progressSchema);
const Meal = mongoose.model('Meal', mealSchema);
const Water = mongoose.model('Water', waterSchema);
const Activity = mongoose.model('Activity', activitySchema);
const HealthGoals = mongoose.model('HealthGoals', healthGoalsSchema);

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
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            name: "Write please",
            phone: "Write please"
        });

        await newUser.save();
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
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.status(200).json({ username: user.username, email: user.email, name: user.name, phone: user.phone });
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

app.post('/api/user', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.email = req.body.email || user.email;
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        await user.save();

        res.status(200).json({ message: 'User data updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/answers', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.answers = { ...user.answers, ...req.body };
        await user.save();

        res.status(200).json({ message: 'Answer saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/progress', verifyToken, async (req, res) => {
    try {
        const progress = await Progress.findOne({ userEmail: req.user.email }).sort({ date: -1 });
        if (!progress) {
            const defaultProgress = new Progress({
                userEmail: req.user.email,
                fat: 29,
                protein: 65,
                carbs: 85,
                calories: 1284
            });
            await defaultProgress.save();
            return res.status(200).json({
                fat: defaultProgress.fat,
                protein: defaultProgress.protein,
                carbs: defaultProgress.carbs,
                calories: defaultProgress.calories
            });
        }
        res.status(200).json({
            fat: progress.fat,
            protein: progress.protein,
            carbs: progress.carbs,
            calories: progress.calories
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/progress', verifyToken, async (req, res) => {
    try {
        const newProgress = new Progress({
            userEmail: req.user.email,
            fat: req.body.fat || 0,
            protein: req.body.protein || 0,
            carbs: req.body.carbs || 0,
            calories: req.body.calories || 0
        });
        await newProgress.save();
        res.status(200).json({ message: 'Progress updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/meals', verifyToken, async (req, res) => {
    try {
        const meals = await Meal.find({ userEmail: req.user.email }).sort({ date: -1 }).limit(3);
        res.status(200).json(meals);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/meals', verifyToken, async (req, res) => {
    try {
        const newMeal = new Meal({
            userEmail: req.user.email,
            name: req.body.name,
            calories: req.body.calories || 0,
            image: req.body.image || ""
        });
        await newMeal.save();
        res.status(200).json({ message: 'Meal added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/water', verifyToken, async (req, res) => {
    try {
        const water = await Water.findOne({ userEmail: req.user.email }).sort({ date: -1 });
        if (!water) {
            const defaultWater = new Water({
                userEmail: req.user.email,
                count: 5
            });
            await defaultWater.save();
            return res.status(200).json({ count: defaultWater.count });
        }
        res.status(200).json({ count: water.count });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/water', verifyToken, async (req, res) => {
    try {
        const newWater = new Water({
            userEmail: req.user.email,
            count: req.body.count || 0
        });
        await newWater.save();
        res.status(200).json({ message: 'Water count updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/activity', verifyToken, async (req, res) => {
    try {
        const activities = await Activity.find({ userEmail: req.user.email }).sort({ date: -1 }).limit(5);
        if (activities.length === 0) {
            const defaultActivities = [
                new Activity({ userEmail: req.user.email, day: "Mon", value: 2 }),
                new Activity({ userEmail: req.user.email, day: "Tue", value: 4 }),
                new Activity({ userEmail: req.user.email, day: "Wed", value: 6 }),
                new Activity({ userEmail: req.user.email, day: "Thu", value: 3 }),
                new Activity({ userEmail: req.user.email, day: "Fri", value: 1 })
            ];
            await Activity.insertMany(defaultActivities);
            return res.status(200).json(defaultActivities);
        }
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/activity', verifyToken, async (req, res) => {
    try {
        const newActivity = new Activity({
            userEmail: req.user.email,
            day: req.body.day,
            value: req.body.value || 0
        });
        await newActivity.save();
        res.status(200).json({ message: 'Activity added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/search-food', verifyToken, async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter "q" is required' });
        }

        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);

        const foods = response.data.meals ? response.data.meals.map(meal => ({
            name: meal.strMeal,
            image: meal.strMealThumb || ''
        })) : [];

        res.status(200).json(foods);
    } catch (error) {
        console.error('Error fetching food data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch food data' });
    }
});

app.get('/api/health-goals', verifyToken, async (req, res) => {
    try {
        const goals = await HealthGoals.findOne({ userEmail: req.user.email }).sort({ date: -1 });
        if (!goals) {
            const defaultGoals = new HealthGoals({
                userEmail: req.user.email,
                current: { weight: "Write please", water: "Write please", calories: "Write please" },
                target: { weight: "Write please", water: "Write please", calories: "Write please" }
            });
            await defaultGoals.save();
            return res.status(200).json({
                current: defaultGoals.current,
                target: defaultGoals.target
            });
        }
        res.status(200).json({
            current: goals.current,
            target: goals.target
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/health-goals', verifyToken, async (req, res) => {
    try {
        const newGoals = new HealthGoals({
            userEmail: req.user.email,
            current: req.body.current || { weight: "Write please", water: "Write please", calories: "Write please" },
            target: req.body.target || { weight: "Write please", water: "Write please", calories: "Write please" }
        });
        await newGoals.save();
        res.status(200).json({ message: 'Health goals updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to my User Registration and Login API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});