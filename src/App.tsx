import { BrowserRouter as Router, Routes, Route,  Link } from 'react-router-dom';
import "./style/mainpage.css";
import './App.css';
import happyCustomers from './img/mainpage/happy-customers.svg';
import people from './img/mainpage/people.svg';
import flower from './img/mainpage/flower.svg';
import guidance from './img/mainpage/guidance.svg';
import food from './img/mainpage/food.svg';
import meal from './img/mainpage/meal.svg';
import logo from './img/mainpage/logo.svg';
import goTop from './img/mainpage/go-top.svg'
import email from './img/mainpage/email.svg';
import phone from './img/mainpage/phone.svg';
import location from './img/mainpage/location.svg';
function App() {
    return (
        <Router>
            <header>
                <nav>
                    <Link to="/home" className="link hover-underline-animation">Home</Link>
                    <Link to="/features" className="link hover-underline-animation">Features</Link>
                    <Link to="/articles" className="link hover-underline-animation">Articles</Link>
                    <Link to="/contact" className="link hover-underline-animation">Contact us</Link>
                    <Link to="/signup" className="link sign-up">Sign up</Link>
                </nav>

                <div className="header-content">
                    <div className="introduction">
                        <h1>Welcome The <span style={{color: "#4F772D"}}>Better</span> <br/>Version Of Yourself</h1>
                        <p style={{marginTop: "56px"}}>Lorem ipsum dolor sit amet consectetur. Tellus libero nec ornare
                            netus tincidunt. Orci blandit lectus accumsan magna dictumst tortor. </p>
                        <div className="introduction-under">
                            <button><span>&rarr;</span><p>Get Your Plan</p></button>
                            <img src={happyCustomers} alt="My Image"/>
                            <img src={people} alt="My Image"/>

                        </div>
                    </div>

                </div>
            </header>
            <div className="features">
                <div className="features-header">
                    <h1>Fea<span>t</span>ures</h1>
                    <p>Welcome to the Feature Section of Nutritionist, your ultimate destination for all things
                        nutrition and wellness.</p>
                </div>
                <div className="offers">
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={flower} alt="My Image"/>
                                <p>Personalized Nutrition Plans</p>
                            </div>
                            <p style={{marginTop: "24px"}}>Receive a tailored nutrition plan designed specifically for
                                your <br/> body and goals. Our certified nutritionists will consider your <br/> unique
                                needs, dietary preferences, and health conditions to <br/> create a plan that suits you
                                best.</p>
                        </div>
                    </div>
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={guidance} alt="My Image"/>
                                <p>Guidance from Certified Nutritionists</p>
                            </div>
                            <p style={{marginTop: "24px"}}>Our team of experienced and certified nutritionists will
                                provide professional guidance and support throughout your journey. They will answer your
                                questions, address your concerns, and keep you motivated as you work towards your
                                goals.</p>
                        </div>
                    </div>
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={food} alt="My Image"/>
                                <p>Food Tracking and Analysis</p>
                            </div>
                            <p style={{marginTop: "24px"}}>Effortlessly track your food intake using our user-friendly
                                app. Our nutritionists will analyze your data to provide insights into your eating
                                habits, help you identify areas for improvement, and make personalized
                                recommendations.</p>
                        </div>
                    </div>
                    <div className="offer">
                        <div className="offer-content">
                            <div className="offer-flex">
                                <img src={meal} alt="My Image"/>
                                <p>Meal Planning and Recipes</p>
                            </div>
                            <p style={{marginTop: "24px"}}>Access a vast collection of delicious and healthy recipes
                                tailored to your dietary needs. Our nutritionists will also create personalized meal
                                plans, making it easier for you to stay on track and enjoy nutritious meals.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stats-container">
                <div className="stat">
                    <h2>3.2 <span>k</span></h2>
                    <p>Growing community</p>
                </div>
                <div className="stat">
                    <h2>1.8 <span>%</span></h2>
                    <p>Health progress tracker</p>
                </div>
                <div className="stat">
                    <h2>5 <span>k+</span></h2>
                    <p>Plans meals</p>
                </div>
                <div className="info">
                    <p>Lorem ipsum dolor sit amet consectetur. Tellus libero nec ornare netus tincidunt. Orci
                        blandit.</p>
                    <a href="#">Join us →</a>
                </div>
            </div>

            <footer>
                <div className="top-footer">
                    <img src={logo} alt=""/>
                    <nav>
                        <Link to="/home" className="" style={{textDecoration:"none", color:"white"}}>Home</Link>
                        <Link to="/features" className="" style={{textDecoration:"none", color:"white"}}>Features</Link>
                        <Link to="/articles" className="" style={{textDecoration:"none", color:"white"}}>Articles</Link>
                        <Link to="/contact" className="" style={{textDecoration:"none", color:"white"}}>Contact us</Link>
                    </nav>
                    <div className="go-top">
                        <p>Got To Top</p>
                        <img src={goTop} alt=""/>
                    </div>
                </div>
                <div className="info-footer">
                    <div className="info-footer-items">
                        <div className="items">
                            <img src={email} alt=""/>
                            <p>seed@gmail.com</p>
                        </div>
                        <div className="items">
                            <img src={phone} alt=""/>
                            <p>+48 790 817 968</p>
                        </div>
                        <div className="items">
                            <img src={location} alt=""/>
                            <p>Poland</p>
                        </div>
                    </div>
                </div>
                <div className="bottom-footer">
                    <p>© 2025 Seed. All rights reserved.</p>
                </div>
            </footer>
            <Routes>
                <Route path="/home" element={""}/>
                <Route path="/features" element={""}/>
                <Route path="/articles" element={""}/>
                <Route path="/contact" element={""}/>
                <Route path="/signup" element={""}/>
                <Route path="*" element={""}/>
            </Routes>
        </Router>
    );
}

export default App;
