import Header from "./header.tsx";
import '../style/signup.css'
import login_picture from '../img/signup/login_picture.svg'
import { useState, useEffect } from 'react';



function Loadingpage({ loading }: { loading: boolean }) {
    return (
        <div className={`loading-screen ${loading ? 'visible' : 'hidden'}`}>
            <div className="loader"></div>
        </div>
    );
}


function Signup() {
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Loadingpage loading={loading} />
            <div className="main" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.8s ease' }}>
                <Header />
                <div className="regestration">
                    <div className="photo">
                        <img src={login_picture} alt=""/>
                    </div>
                    <div className="right">
                        <div className="welcome">
                            <p style={{marginBottom:"26px"}}>Welcome to <span>Seed</span>!</p>
                            <div className="register-button">
                                <p
                                    className={isLogin ? "active" : ""}
                                    onClick={() => setIsLogin(true)}
                                >
                                    Log in
                                </p>
                                <p
                                    className={!isLogin ? "active" : ""}
                                    onClick={() => setIsLogin(false)}
                                >
                                    Register
                                </p>
                            </div>

                            <div className="regestration-form" style={{marginTop:"26px"}}>
                                {isLogin ? (
                                    <>
                                        <label>Email Address</label>
                                        <input type="text" placeholder="Email"/>
                                        <label>Password</label>
                                        <input type="password" placeholder="Password"/>
                                        <button style={{marginTop:"45px"}}>Log in</button>
                                    </>
                                ) : (
                                    <>
                                        <label>Email Address</label>
                                        <input type="text" placeholder="Email"/>
                                        <label>User name</label>
                                        <input type="text" placeholder="Username"/>
                                        <label>Password</label>
                                        <input type="password" placeholder="Password"/>
                                        <button style={{marginTop:"45px"}}>Sign up</button>
                                    </>
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup ;
