import { BrowserRouter as Router, Routes, Route,  Link } from 'react-router-dom';
import "./style/mainpage.css";
import './App.css';
import happyCustomers from './img/mainpage/happy-customers.svg';
import people from './img/mainpage/people.svg';
import flower from './img/mainpage/flower.svg';
import guidance from './img/mainpage/guidance.svg';
import food from './img/mainpage/food.svg';
import meal from './img/mainpage/meal.svg';
function App() {
    return (
        <Router>
            <header>
                <nav>
                    <Link to="/home" className="link hover-underline-animation">Home</Link>
                    <Link to="/features" className="link hover-underline-animation">Features</Link>
                    <Link to="/articles" className="link hover-underline-animation">Articles</Link>
                    <Link to="/contact" className="link hover-underline-animation">Contact us</Link>
                    <Link to="/signup" className="link hover-underline-animation">Sign up</Link>
                </nav>

                <div className="header-content">
                    <div className="introduction">
                        <h1>Welcome The <span>Better</span> <br/>Version Of Yourself</h1>
                        <p>Lorem ipsum dolor sit amet consectetur. Tellus libero nec ornare <br/>netus tincidunt. Orci blandit lectus accumsan magna dictumst tortor. </p>
                        <div className="introduction-under">
                            <button><span>&rarr;</span>Get Your Plan</button>
                            <img src={happyCustomers} alt="My Image" />
                            <img src={people} alt="My Image" />

                        </div>
                    </div>

                </div>
            </header>
            <div className="features">
                <div className="features-header">
                    <h1>Features</h1>
                    <p>Welcome to the Feature Section of Nutritionist, your ultimate destination for all things nutrition and wellness.</p>
                </div>
                <div className="offers">
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={flower} alt="My Image" />
                                <p>Personalized Nutrition Plans</p>
                            </div>
                            <p style={{marginTop:"24px"}}>Receive a tailored nutrition plan designed specifically for your <br/> body and goals. Our certified nutritionists will consider your <br/> unique needs, dietary preferences, and health conditions to <br/> create a plan that suits you best.</p>
                        </div>
                    </div>
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={guidance} alt="My Image" />
                                <p>Guidance from Certified Nutritionists</p>
                            </div>
                            <p style={{marginTop:"24px"}}>Our team of experienced and certified nutritionists will provide professional guidance and support throughout your journey. They will answer your questions, address your concerns, and keep you motivated as you work towards your goals.</p>
                        </div>
                    </div>
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={food} alt="My Image" />
                                <p>Food Tracking and Analysis</p>
                            </div>
                            <p style={{marginTop:"24px"}}>Effortlessly track your food intake using our user-friendly app. Our nutritionists will analyze your data to provide insights into your eating habits, help you identify areas for improvement, and make personalized recommendations.</p>
                        </div>
                    </div>
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={meal} alt="My Image" />
                                <p>Meal Planning and Recipes</p>
                            </div>
                            <p style={{marginTop:"24px"}}>Access a vast collection of delicious and healthy recipes tailored to your dietary needs. Our nutritionists will also create personalized meal plans, making it easier for you to stay on track and enjoy nutritious meals.</p>
                        </div>
                    </div>
                </div>
            </div>
            <footer>

            </footer>
            <Routes>
                <Route path="/home" element={""} />
                <Route path="/features" element={""} />
                <Route path="/articles" element={""} />
                <Route path="/contact" element={""} />
                <Route path="/signup" element={""} />
                <Route path="*" element={""} />
            </Routes>
        </Router>
    );
}

export default App;
