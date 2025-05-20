
import "../style/appPage.css";
import { useState, useEffect } from "react";
import Loadingpage   from "./Loadingpage.tsx";

function AppPage() {
    const [user, setUser] = useState<{ username: string; email: string } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await fetch("http://localhost:3000/api/user", {
                    method: "GET",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch user data");
                }

                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);


    return (
        <>
            <Loadingpage loading={loading} />
            <h1 className="hello_h1">Hi, <span>{user?.username || "Guest"}</span></h1>
        </>
    );
}

export default AppPage;