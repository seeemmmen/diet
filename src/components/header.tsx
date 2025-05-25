import {useState} from "react";
import {Link} from "react-router-dom"; // Добавляем useNavigate для управления переходами
import logo from "../img/mainpage/logo.svg";
import menu_nav from "../img/mainpage/menumav.svg";
import closeIcon from "../img/mainpage/close-icon.svg";
import "../style/header.css";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Toggling menu, current state:", isMenuOpen);
        setIsMenuOpen((prev) => {
            const newState = !prev;
            console.log("New state:", newState);
            return newState;
        });
    };

    const handleLinkClick = (elementId: string) => {
        setIsMenuOpen(false);
        const element = document.getElementById(elementId);
        if (element) {
            console.log("Scrolling to element:", element);
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };


    return (
        <>
            <header>
                <div className="logo-header">
                    <img src={logo} alt="Logo" />
                </div>
                <nav className="desktop-nav">
                    <Link to="/home" className="link hover-underline-animation">Home</Link>
                    <Link to="/features" className="link hover-underline-animation">Features</Link>
                    <Link to="/articles" className="link hover-underline-animation">Articles</Link>
                    <Link to="/contact" className="link hover-underline-animation">Contact us</Link>
                    <Link to="/signup" className="link sign-up">Sign up</Link>
                </nav>
                <div className="menunav" onClick={toggleMenu}>
                    <img src={menu_nav} alt="Menu" />
                </div>
                <nav className={`mobile-nav ${isMenuOpen ? "active" : ""}`}>
                    <div className="mobile-nav-header">
                        <img src={logo} alt="Logo" className="logo-header" />
                        <img src={closeIcon} alt="Close" className="close-icon" onClick={toggleMenu} />
                    </div>
                    <div className="mobile-nav-links">
                        <a
                            className="link"
                            onClick={() => handleLinkClick("features")}
                        >
                            Features
                        </a>
                        <a
                            className="link"
                            onClick={() => handleLinkClick("stats")}
                        >
                            Articles
                        </a>
                        <a
                            className="link"
                            onClick={() => handleLinkClick("footer")}
                        >
                            Contact Us
                        </a>
                    </div>
                    <Link to="/signup" className="mobile-login-btn">Sign up</Link>

                </nav>
            </header>
        </>
    );
}

export default Header;