import { useState, useEffect } from "react";
import Sidebar from "./siedebar.tsx";
import "../style/meals.css";
import Loadingpage from "./Loadingpage.tsx";

interface Meal {
    userEmail: string;
    name: string;
    calories: number;
    image: string;
    date: string;
}

interface Food {
    name: string;
    image: string;
}

interface Recipe {
    name: string;
    image: string;
    ingredients: string[];
    instructions: string;
    video: string;
}

const MealsComponent = () => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Food[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    const fetchMeals = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please log in to view meals");
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
                throw new Error("Failed to load meals");
            }

            const mealsData = await response.json();
            setMeals(mealsData);
            setLoading(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const handleSearch = async () => {
        const token = localStorage.getItem("token");
        if (!token || !searchQuery.trim()) return;

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
            console.error("Search error:", error);
            setSearchResults([]);
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
                    calories: 0,
                    image: food.image || "",
                }),
            });
            if (!response.ok) throw new Error("Failed to add meal");
            await fetchMeals();
            setSearchResults([]);
        } catch (error) {
            console.error("Error adding meal:", error);
        }
    };

    const fetchRecipeDetails = async (mealName: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`/api/recipe-details?name=${encodeURIComponent(mealName)}`, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error("Failed to load recipe details");
            const data = await response.json();
            setSelectedRecipe(data);
        } catch (error) {
            console.error("Error loading recipe details:", error);
            setSelectedRecipe(null);
        }
    };

    const handleMealClick = (meal: Meal) => {
        fetchRecipeDetails(meal.name);
    };

    const closeModal = () => {
        setSelectedRecipe(null);
    };

    const getYouTubeVideoId = (url: string): string | null => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <>
            <Loadingpage loading={loading} />
            <Sidebar />
            <div className="content-recipes">
                <div className="container">
                    {error && <div className="text-center text-red-500">{error}</div>}
                    {!loading && !error && (
                        <>
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
                                    className="w-full max-w-md p-2 border rounded"
                                />
                                {searchResults.length > 0 && (
                                    <div className="search-results">
                                        {searchResults.map((food, index) => (
                                            <div
                                                key={index}
                                                className="search-result"
                                                onClick={() => handleAddMealFromSearch(food)}
                                            >
                                                {food.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="recipes">
                                {meals.length === 0 ? (
                                    <p className="text-center text-gray-500">No meals found</p>
                                ) : (
                                    meals.map((meal, index) => (
                                        <div
                                            key={index}
                                            className="recipe"
                                            onClick={() => handleMealClick(meal)}
                                        >
                                            <img
                                                src={meal.image || "https://via.placeholder.com/250x130"}
                                                alt={meal.name}
                                                className="w-full h-32 object-cover rounded"
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
                        </>
                    )}
                </div>
            </div>

            {selectedRecipe && (
                <div className="recipe-modal">
                    <div className="modal-content">
                        <button className="back-button" onClick={closeModal}>
                            ← Back
                        </button>
                        <img
                            src={selectedRecipe.image || "https://via.placeholder.com/300"}
                            alt={selectedRecipe.name}
                            className="w-full h-64 object-cover rounded"
                        />
                        <h2>{selectedRecipe.name}</h2>
                        <h3>Ingredients:</h3>
                        <ul>
                            {selectedRecipe.ingredients.map((ingredient, idx) => (
                                <li key={idx}>{ingredient || "N/A"}</li>
                            ))}
                        </ul>
                        <h3>Preparation Instruction:</h3>
                        <p>{selectedRecipe.instructions || "No instructions available."}</p>
                        {selectedRecipe.video && (
                            <div>
                                <h3>Video Tutorial:</h3>
                                <div className="video-container">
                                    <iframe
                                        width="420"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(selectedRecipe.video)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default MealsComponent;