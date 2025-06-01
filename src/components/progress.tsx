import Sidebar from "./siedebar.tsx";
import "../style/progress.css";
import { useState, useEffect } from "react";

interface HealthGoals {
    current: {
        weight: string;
        water: string;
        calories: string;
    };
    target: {
        weight: string;
        water: string;
        calories: string;
    };
}

function Progress() {
    const [healthGoals, setHealthGoals] = useState<HealthGoals | undefined>();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Token:', token); // Debug token
                if (!token) {
                    setError('No authentication token found. Please log in.');
                    return;
                }
                const goalsResponse = await fetch('/api/health-goals', {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                if (!goalsResponse.ok) {
                    throw new Error(`Failed to fetch health goals: ${goalsResponse.status}`);
                }
                const goalsData = await goalsResponse.json();
                setHealthGoals(goalsData);
                console.log('Goals Data:', goalsData);
            } catch (error) {
                console.error(error);
                setError('Failed to load health goals. Please try again or log in.');
            }
        };
        fetchUserData();
    }, []);

    const waterPercentage = healthGoals?.current?.water && healthGoals?.target?.water && parseFloat(healthGoals.target.water) > 0
        ? ((parseFloat(healthGoals.current.water) / parseFloat(healthGoals.target.water)) * 100).toFixed(0)
        : '0';

    return (
        <>
            <Sidebar />
            <div className="content-progress">
                <div className="container">
                    {error && <div className="error">{error}</div>}
                    <div className="header-progress">
                        <h1>Your Progress</h1>
                        <p>Track your progress and achieve goals step by step.</p>
                    </div>
                    <div className="section activity">
                        <div className="flex justify-between items-center mb-2">
                            <h2>Activity</h2>
                            <select>
                                <option>This week</option>
                            </select>
                        </div>
                        <div className="chart">
                            <div className="bar">
                                <div style={{ height: "30%" }}></div>
                                <span>Mon</span>
                            </div>
                            <div className="bar">
                                <div className="highlight" style={{ height: "100%" }}>
                                    <span className="value">x35.98</span>
                                </div>
                                <span>Tue</span>
                            </div>
                            <div className="bar">
                                <div style={{ height: "70%" }}></div>
                                <span>Wed</span>
                            </div>
                            <div className="bar">
                                <div style={{ height: "50%" }}></div>
                                <span>Thu</span>
                            </div>
                            <div className="bar">
                                <div style={{ height: "40%" }}></div>
                                <span>Fri</span>
                            </div>
                        </div>
                        <div className="stats">
                            <span className="increase">+15%</span> Your most active day was{" "}
                            <strong>TUESDAY</strong>, — 25% more than on Monday. Keep it up!
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="section calories" style={{ display:"block"}}>
                            <h2>Calories Analysis</h2>
                            <div className="values">
                                <span className="current">{healthGoals?.current?.calories || 'N/A'} kcal</span>
                                <span className="separator">/</span>
                                <span className="goal">{healthGoals?.target?.calories || 'N/A'} kcal</span>
                            </div>
                        </div>

                        <div className="section weight">
                            <div className="chart">
                                <p>{healthGoals?.current?.weight || 'N/A'} kg</p>
                                <span>{healthGoals?.target?.weight || 'N/A'} 65 kg</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="section water">
                            <div>
                                <h2>Water</h2>
                            </div>
                            <div className="section-water-container">
                                <div className="value">{healthGoals?.current?.water || 'N/A'} / {healthGoals?.target?.water || 'N/A'}</div>
                                <div className="progress">{waterPercentage}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Progress;