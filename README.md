# 🥗 Diet App

A simple and flexible diet tracking application built with **Node.js**, **Express**, and **MongoDB**.  
Users can register, log in, manage their profile, and track meals and food items to support healthy eating habits.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express  
- **Database**: MongoDB with Mongoose ODM  
- **Authentication**: JWT (JSON Web Tokens)  
- **Validation**: Joi  
- **Logging**: Morgan  
- **Environment Variables**: dotenv

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/seeemmmen/diet.git
cd diet
2. Install dependencies
bash
Копировать
Редактировать
npm install
3. Create an .env file
Use the provided .env.example as a template:

bash
Копировать
Редактировать
cp .env.example .env
4. Start the development server
bash
Копировать
Редактировать
npm run dev
📌 Available Scripts
npm run dev – Start the server in development mode (using nodemon)

npm start – Start the server in production mode

🛡️ API Endpoints
🔐 Auth
POST /api/auth/register – Register a new user

POST /api/auth/login – Log in and receive a JWT

👤 User
GET /api/user/profile – Fetch current user profile

PUT /api/user/profile – Update user profile

🍽️ Food / Meals
POST /api/food – Add a food item

GET /api/food – Get all food items

DELETE /api/food/:id – Delete a food item by ID

⚠️ Note: Actual endpoint names and structures may vary. Adjust according to your routing logic.

📁 Project Structure
csharp
Копировать
Редактировать
diet/
│
├── controllers/       # Route handler logic
├── middlewares/       # Authentication, error handling, etc.
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── utils/             # Utility functions
├── .env.example       # Sample environment variables
├── app.js             # Express app configuration
└── server.js          # Entry point
🧪 Features in Progress
🔢 Calorie & macro tracking (proteins, fats, carbs)

📊 Daily & weekly nutrition analytics

🌐 Frontend integration (React or Webflow)

🌍 Multi-language support (i18n)
