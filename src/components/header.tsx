import logo from "../img/mainpage/logo.svg";
import {Link} from "react-router-dom";
import menu_nav from "../img/mainpage/menumav.svg";


function Header(){
    return(
        <>
            <header>
                <div className="logo-header">
                    <img src={logo} alt=""/>
                </div>
                <nav>
                    <Link to="/home" className="link hover-underline-animation">Home</Link>
                    <Link to="/features" className="link hover-underline-animation">Features</Link>
                    <Link to="/articles" className="link hover-underline-animation">Articles</Link>
                    <Link to="/contact" className="link hover-underline-animation">Contact us</Link>
                    <Link to="/signup" className="link sign-up">Sign up</Link>
                </nav>
                <div className="menunav">
                    <img src={menu_nav} alt=""/>
                </div>

            </header>
        </>
    );
}
export default Header;