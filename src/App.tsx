import "./style/mainpage.css";
import './App.css';
import {Routes, Route ,Navigate } from 'react-router-dom';
import Layout from './components/layout.tsx';       // С header и footer
import Signup from './components/signup.tsx';    // Отдельная страница без оформления
import HomePage from './components/homePage.tsx';        // Главная с контентом
function App() {
    return (

        <Routes>
            <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>


    );
}

export default App;
