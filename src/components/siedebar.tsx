import { Link } from "react-router-dom";
import logo from "../img/mainpage/logo.svg";
import home from "../img/app/home.svg";
import recipes from "../img/app/recipes.svg";
import progress from "../img/app/progress.svg";



function Sidebar() {
    return (
        <nav className="sidebar">
            <div className="logo">
                <img src={logo} alt="Логотип" />
            </div>
            <ul>
                <li className="active">
                    <Link to="/app">
                        <i className="fas fa-home"></i>
                        <span><img src={home} alt=""/>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/app/recipes">
                        <i className="fas fa-utensils"></i>
                        <span><img src={recipes} alt=""/>Recipes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/app/progress">
                        <i className="fas fa-chart-line"></i>
                        <span><img src={progress} alt=""/>Progress</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;