import "../style/appPage.css";
import { useState, useEffect } from "react";
import Loadingpage from "./Loadingpage.tsx";
import Sidebar from "./siedebar.tsx";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Progress {
    fat: number;
    protein: number;
    carbs: number;
    calories: number;
}

interface Meal {
    name: string;
    calories: number;
    image: string;
}

interface Activity {
    day: string;
    value: number;
}

interface Food {
    name: string;
    calories: number;
    image: string;
}

function AppPage() {
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<Progress | null>(null);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [waterCount, setWaterCount] = useState<number>(0);
    const [activity, setActivity] = useState<Activity[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Food[]>([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const userResponse = await fetch("/api/user", {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            if (!userResponse.ok) throw new Error("Failed to fetch user data");
            const userData = await userResponse.json();
            setUser(userData);

            const progressResponse = await fetch("/api/progress", {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            if (!progressResponse.ok) throw new Error("Failed to fetch progress data");
            const progressData = await progressResponse.json();
            setProgress(progressData);

            const mealsResponse = await fetch("/api/meals", {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            if (!mealsResponse.ok) throw new Error("Failed to fetch meals data");
            const mealsData = await mealsResponse.json();
            setMeals(mealsData);

            const waterResponse = await fetch("/api/water", {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            if (!waterResponse.ok) throw new Error("Failed to fetch water data");
            const waterData = await waterResponse.json();
            setWaterCount(waterData.count);

            const activityResponse = await fetch("/api/activity", {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            if (!activityResponse.ok) throw new Error("Failed to fetch activity data");
            const activityData = await activityResponse.json();
            setActivity(activityData);

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => fetchData(), 30000);
        return () => clearInterval(intervalId);
    }, []);

    const handleAddWater = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("/api/water", {
                method: "POST",
                headers: {
                    Authorization: token!,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ count: waterCount + 1 }),
            });
            if (!response.ok) throw new Error("Failed to update water count");
            setWaterCount(waterCount + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = async () => {
        const token = localStorage.getItem("token");
        if (!token || !searchQuery) return;

        try {
            const response = await fetch(`/api/search-food?q=${encodeURIComponent(searchQuery)}`, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to search food");
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddMealFromSearch = async (food: Food) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("/api/meals", {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: food.name,
                    calories: food.calories,
                    image: food.image,
                }),
            });
            if (!response.ok) throw new Error("Failed to add meal");
            await fetchData();
            setSearchResults([]);
        } catch (error) {
            console.error(error);
        }
    };

    const chartData = {
        labels: activity.map((a) => a.day),
        datasets: [
            {
                label: "Activity",
                data: activity.map((a) => a.value),
                backgroundColor: "#ff9999",
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: { beginAtZero: true, display: false },
            x: { ticks: { font: { family: "Urbanist" } } },
        },
        plugins: { legend: { display: false } },
    };

    return (
        <div className="app-container">
            <Loadingpage loading={loading} />
            <Sidebar />
            <div className="main-content">
                <h1 className="hello_h1">
                    Hi, <span>{user?.username || "Guest"}!</span>
                </h1>
                <p className="subheading">Here's your personalized plan for today.</p>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by recipes, food and more"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            {searchResults.map((food, index) => (
                                <div key={index} className="search-result" onClick={() => handleAddMealFromSearch(food)}>
                                    {food.name} ({food.calories} kcal)
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="dashboard">
                    {/* Today's Progress */}
                    <div className="progress-section">
                        <h3>Today's Progress</h3>
                        <div className="calories">
                            <span className="calories-icon">🔥</span>
                            <span>{progress?.calories || 0}</span>
                        </div>
                        <div className="progress-circles">
                            <div className="circle">
                                <span>{progress?.fat || 0}%</span>
                                <p>Fat</p>
                            </div>
                            <div className="circle">
                                <span>{progress?.protein || 0}%</span>
                                <p>Pro</p>
                            </div>
                            <div className="circle">
                                <span>{progress?.carbs || 0}%</span>
                                <p>Carb</p>
                            </div>
                        </div>
                    </div>

                    {/* Activity */}
                    <div className="activity-section">
                        <h3>Activity</h3>
                        <div className="activity-chart">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Today's Meals */}
                    <div className="meals-section">
                        <h3>Today's Meals</h3>
                        {meals.map((meal, index) => (
                            <div key={index} className="meal">
                                <span className="meal-icon">🍽️</span>
                                <span>{meal.name}</span>
                                <span>{meal.calories} kcal</span>
                                <img src={meal.image} alt={meal.name} className="meal-image" />
                                <Link to="/add-meal">
                                    <button className="add-button">+</button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Water */}
                    <div className="water-section">
                        <h3>Water</h3>
                        <div className="water-counter">
                            {[...Array(8)].map((_, i) => (
                                <span key={i} className={i < waterCount ? "filled" : ""}>💧</span>
                            ))}
                            <button onClick={handleAddWater} className="add-button">+</button>
                        </div>
                    </div>

                    {/* Weekly Progress */}
                    <div className="weekly-progress">
                        <h3>Track your Weekly Progress</h3>
                        <Link to="/weekly-progress">
                            <button>View more</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppPage;