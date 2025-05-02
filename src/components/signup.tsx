import Header from "./header.tsx";
import '../style/signup.css'
import login_picture from '../img/signup/login_picture.svg'


function Signup(){
    return(
       <>
           <div className="main">
               <Header />
               <div className="regestration">
                   <div className="photo">
                       <img src={login_picture} alt=""/>
                   </div>
                   <div className="right">
                       <div className="welcome">
                           <p>Welcome to <span>Seed</span>!</p>
                           <div className="register-button">
                               <p>Log in</p>
                               <p>Register</p>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </>
    )
}
export default Signup;