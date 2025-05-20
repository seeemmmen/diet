import Header from "./header.tsx";
import '../style/signup.css'
import login_picture from '../img/signup/login_picture.svg'
import { useState, useEffect } from 'react';
import * as React from "react";
import {useNavigate} from 'react-router-dom';
import 'react-circular-progressbar/dist/styles.css';
import Loadingpage from "./Loadingpage.tsx";





function Signup() {
    const [loading, setLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [message,setMessage] = useState('');
    const [formData, setFormData]=useState({
       email:'',
       username:'',
       password:''
    });
    const navigate = useNavigate();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e:React.FormEvent) => {
            e.preventDefault();
            const endpoint = isLogin ? '/api/login' : '/api/register';
            try{
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    setMessage(data.message);
                    navigate('/app');
                    if (!isLogin){
                        navigate('/quastions');
                    }
                } else {
                    setMessage(data.error || 'Ошибка на сервере');
                }
            }catch (error) {
                console.error(error);
                setMessage('Something went wrong');

            }

    };



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
                                    onClick={() =>{
                                        setIsLogin(true);
                                    }}
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
                            <p>{message}</p>

                            <form onSubmit={handleSubmit} className="regestration-form" style={{ marginTop: "26px" }}>
                                {isLogin ? (
                                    <>
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                        />
                                        <button type="submit" style={{ marginTop: "45px" }}>
                                            Log in
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                        />
                                        <label>User name</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Username"
                                        />
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                        />
                                        <button type="submit" style={{ marginTop: "45px" }}>
                                            Sign up
                                        </button>
                                    </>
                                )}
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup ;
