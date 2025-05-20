import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/layout.tsx';
import Signup from './components/signup.tsx';
import HomePage from './components/homePage.tsx';
import Quastions from './components/quastions.tsx';
import AppPage from './components/appPage.tsx';
import Layout_app from './components/layout-app.tsx';
import Settings from './components/settings.tsx';
import Loadingpage from './components/Loadingpage.tsx';

function App() {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                const response = await fetch('http://localhost:3000/api/user', {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <Loadingpage loading={true} />;
    }

    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="/" element={<Navigate to={isAuthenticated ? '/app' : '/home'} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/quastions" element={<Quastions />} />
            <Route element={<Layout_app />}>
                <Route path="/app" element={<AppPage/>} />
            </Route>
            <Route element={<Layout_app />}>
                <Route path="/app/settings" element={<Settings/>} />
            </Route>
            <Route path="*" element={<div>Страница не найдена</div>} />
        </Routes>
    );
}

export default App;