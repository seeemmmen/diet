import logo from "../img/mainpage/logo.svg";
import avatar from "../img/app/avatar.png";
import { Link  , useNavigate} from "react-router-dom";
import LogoutButton from './LogoutButton';

function HeaderApp() {
    const navigate = useNavigate();
    return (
        <header className="app-header mobile-nav-header">
            <img src={logo} alt="Logo" onClick={()=>navigate("/app")} />
            <div className="app-user">
                <Link to="/app/settings"><img src={avatar} alt=""/></Link>
                <LogoutButton />
            </div>
        </header>
    );
}

export default HeaderApp;