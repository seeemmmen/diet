import {useNavigate} from 'react-router-dom';
import logout from '../img/app/logout.png';

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/home');
    }

    return(
        <img src={logout} onClick={handleLogout}  alt=""/>
    );
}
export default LogoutButton;