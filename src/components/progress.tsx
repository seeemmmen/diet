import Sidebar from "./siedebar.tsx";
import "../style/progress.css";
import { useState, useEffect } from "react";
import Loadingpage from "./Loadingpage.tsx";

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

interface Activity {
    day: string;
    value: number;
}

function Progress() {
    const [healthGoals, setHealthGoals] = useState<HealthGoals | undefined>();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
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

                const activityResponse = await fetch('/api/activity', {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                if (!activityResponse.ok) {
                    throw new Error(`Failed to fetch activity data: ${activityResponse.status}`);
                }
                const activityData = await activityResponse.json();
                setActivities(activityData);
            } catch (error) {
                console.error(error);
                setError('Failed to load data. Please try again or log in.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const waterPercentage = healthGoals?.current?.water && healthGoals?.target?.water && parseFloat(healthGoals.target.water) > 0
        ? ((parseFloat(healthGoals.current.water) / parseFloat(healthGoals.target.water)) * 100).toFixed(0)
        : '0';

    const maxActivity = activities.length > 0 ? Math.max(...activities.map(a => a.value)) : 0;
    const mostActiveDay = activities.find(a => a.value === maxActivity)?.day || 'N/A';
    const activityIncrease = activities.length > 1 && activities[0].value && activities[1].value
        ? (((activities[0].value - activities[1].value) / activities[1].value) * 100).toFixed(0)
        : '0';

    return (
        <>
            <Sidebar />
            <div className="content-progress">
                <div className="container">
                    <Loadingpage loading={isLoading} />
                    {error && <div className="error">{error}</div>}
                    {!isLoading && !error && (
                        <>
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
                                    {activities.map((activity, index) => (
                                        <div className="bar" key={index}>
                                            <div
                                                className={activity.value === maxActivity ? "highlight" : ""}
                                                style={{ height: `${(activity.value / maxActivity) * 100 || 0}%` }}
                                            >
                                                {activity.value === maxActivity && (
                                                    <span className="value">x{activity.value}</span>
                                                )}
                                            </div>
                                            <span>{activity.day}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="stats">
                                    <span className="increase">{activityIncrease}%</span> Your most active day was{" "}
                                    <strong>{mostActiveDay.toUpperCase()}</strong>, — {activityIncrease}% more than previous day. Keep it up!
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="section calories" style={{ display: "block" }}>
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
                                        <span>{healthGoals?.target?.weight || 'N/A'} kg</span>
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
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Progress;