import { useState, useEffect } from "react";
import Sidebar from "./siedebar.tsx";
import "../style/meals.css";

interface Meal {
    userEmail: string;
    name: string;
    calories: number;
    image: string;
    date: string;
}
interface Food {
    name: string;
    calories: number;
    image: string;
}

const MealsComponent = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Food[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchMeals = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Необходимо войти в систему");
                setLoading(false);
                return;
            }

            const response = await fetch("/api/meals", {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Не удалось загрузить блюда");
            }

            const mealsData = await response.json();
            setMeals(mealsData);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Произошла ошибка");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

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
            await fetchMeals();
            setSearchResults([]);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <div className="text-center text-gray-500">Загрузка...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <>
            <Sidebar />
            <div className="content-recipes">
                <div className="container">
                    <div className="header-recipes">
                        <h1>Recipes</h1>
                        <p>Find and cook all recipes step by step</p>
                    </div>
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
                                        {food.name} ({food.calories} )
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="recipes">
                        {meals.length === 0 ? (
                            <p>No meals found</p>
                        ) : (
                            meals.map((meal, index) => (
                                <div key={index} className="recipe">
                                    <img
                                        src={meal.image || "https://via.placeholder.com/150"}
                                        alt={meal.name}
                                    />
                                    <h3>{meal.name}</h3>
                                    <p>
                                        Date: {new Date(meal.date).toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MealsComponent;