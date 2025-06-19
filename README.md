# 🥗 Diet App

A simple and extensible diet tracking application built with Node.js, Express, and MongoDB. Users can register, log in, manage their profile, and track meals/products to support healthy eating habits.

## 🚀 Tech Stack

- **Backend**: Node.js, Express  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT (JSON Web Tokens)  
- **Validation**: Joi  
- **Logging**: Morgan  
- **Environment Config**: dotenv

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/seeemmmen/diet.git
   cd diet
Install dependencies:

bash
Копировать
Редактировать
npm install
Create a .env file based on the example:

bash
Копировать
Редактировать
cp .env.example .env
Run the development server:

bash
Копировать
Редактировать
npm run dev
📌 Available Scripts
npm run dev — Start the server in development mode using nodemon

npm start — Start the server in production mode

🛡️ API Endpoints
Auth
POST /api/auth/register – Register a new user

POST /api/auth/login – Login and get a token

User
GET /api/user/profile – Get user profile

PUT /api/user/profile – Update user profile

Food / Meals
POST /api/food – Add a food item

GET /api/food – Get all food items

DELETE /api/food/:id – Delete a specific item

Note: Update the exact endpoints and payloads based on your current routes.

📁 Project Structure
bash
Копировать
Редактировать
diet/
│
├── controllers/      # Route handlers
├── middlewares/      # Authentication, error handlers, etc.
├── models/           # Mongoose schemas
├── routes/           # API route definitions
├── utils/            # Helper functions
├── .env.example      # Sample environment variables
├── app.js            # Express app config
└── server.js         # App entry point
🧪 Features in Progress
Calorie & macro tracking (proteins, fats, carbs)

Daily/weekly nutrition stats and charts

Frontend (React or Webflow)

Multi-language support (i18n)
