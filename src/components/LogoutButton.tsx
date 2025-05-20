import {useNavigate} from 'react-router-dom';
import logout from '../img/app/logout.svg';

function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/home');
    }

    return(
        <img src={logout} onClick={handleLogout} width="30px" alt=""/>
    );
}
export default LogoutButton;