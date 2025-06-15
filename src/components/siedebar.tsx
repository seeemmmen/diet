import { Link, useLocation } from "react-router-dom";
import logo from "../img/mainpage/logo.svg";
import home from "../img/app/home.svg";
import recipes from "../img/app/recipes.svg";
import progress from "../img/app/progress.svg";

function Sidebar() {
    const location = useLocation(); // Получаем текущий маршрут

    return (
        <nav className="sidebar">
            <div className="logo">
                <img src={logo} alt="Логотип" />
            </div>
            <ul>
                <li className={location.pathname === "/app" ? "active" : ""}>
                    <Link to="/app">
                        <span>
                            <img src={home} alt="Иконка Главная" />
                            Home
                        </span>
                    </Link>
                </li>
                <li className={location.pathname === "/app/recipes" ? "active" : ""}>
                    <Link to="/app/recipes">
                        <span>
                            <img src={recipes} alt="Иконка Рецепты" />
                            Recipes
                        </span>
                    </Link>
                </li>
                <li className={location.pathname === "/app/progress" ? "active" : ""}>
                    <Link to="/app/progress">
                        <span>
                            <img src={progress} alt="Иконка Прогресс" />
                            Progress
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;