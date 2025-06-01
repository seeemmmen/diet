import '../style/settings.css';
import avatar from '../img/app/avatar.png';
import { useEffect, useState } from 'react';

interface User {
    username: string;
    email: string;
    name: string;
    phone: string;
}

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

function Settings() {
    const [user, setUser] = useState<User | null>(null);
    const [healthGoals, setHealthGoals] = useState<HealthGoals>({
        current: { weight: 'Write please', water: 'Write please', calories: 'Write please' },
        target: { weight: 'Write please', water: 'Write please', calories: 'Write please' }
    });
    const [userInfo, setUserInfo] = useState({
        email: 'Write please',
        name: 'Write please',
        phone: 'Write please'
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const userResponse = await fetch('/api/user', {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData = await userResponse.json();
                setUser(userData);
                setUserInfo({
                    email: userData.email || 'Write please',
                    name: userData.name || 'Write please',
                    phone: userData.phone || 'Write please'
                });

                const goalsResponse = await fetch('/api/health-goals', {
                    method: 'GET',
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                });
                if (!goalsResponse.ok) throw new Error('Failed to fetch health goals');
                const goalsData = await goalsResponse.json();
                setHealthGoals(goalsData);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleUserInfoChange = (field: string, value: string) => {
        setUserInfo({ ...userInfo, [field]: value });
    };

    const handleCurrentChange = (field: string, value: string) => {
        setHealthGoals({
            ...healthGoals,
            current: { ...healthGoals.current, [field]: value }
        });
    };

    const handleTargetChange = (field: string, value: string) => {
        setHealthGoals({
            ...healthGoals,
            target: { ...healthGoals.target, [field]: value }
        });
    };

    const saveUserInfo = async (info: { email: string; name: string; phone: string }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(info),
            });
            if (!response.ok) throw new Error('Failed to save user info');
        } catch (error) {
            console.error(error);
        }
    };

    const saveGoals = async (goals: HealthGoals) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('/api/health-goals', {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goals),
            });
            if (!response.ok) throw new Error('Failed to save health goals');
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        await saveUserInfo(userInfo);
        await saveGoals(healthGoals);
    };

    return (
        <div className="settings">
            <div className="header-settings">
                <h1>Settings</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="header-settings-account">
                            <img src={avatar} alt="" />
                            <div className="header-settings-account-info">
                                <p style={{ fontSize: "36px" }}>{user?.username || 'Guest'}</p>
                                <p style={{ fontSize: "24px", color: "grey" }}>{user?.email || 'No email'}</p>
                            </div>
                        </div>
                        <div className="header-settings-account-settings">
                            <div className="left-settings">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={(e) => handleUserInfoChange('email', e.target.value)}
                                />
                            </div>
                            <div className="left-settings">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={(e) => handleUserInfoChange('name', e.target.value)}
                                />
                            </div>
                            <div className="left-settings">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userInfo.phone}
                                    onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="health-tracker">
                            <div className="columns">
                                <div className="column">
                                    <div className="header">Current</div>
                                    <div className="row">
                                        <div className="label">Weight</div>
                                        <input
                                            className="value-input"
                                            value={healthGoals.current.weight}
                                            onChange={(e) => handleCurrentChange('weight', e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="label">Water</div>
                                        <input
                                            className="value-input"
                                            value={healthGoals.current.water}
                                            onChange={(e) => handleCurrentChange('water', e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="label">Calories</div>
                                        <input
                                            className="value-input"
                                            type="number"
                                            value={healthGoals.current.calories === 'Write please' ? '' : healthGoals.current.calories}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === '') {
                                                    handleCurrentChange('calories', 'Write please');
                                                } else {
                                                    handleCurrentChange('calories', value);
                                                }
                                            }}
                                            placeholder="Write please"
                                        />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="header">Target</div>
                                    <div className="row">
                                        <div className="label">Weight</div>
                                        <input
                                            className="value-input"
                                            value={healthGoals.target.weight}
                                            onChange={(e) => handleTargetChange('weight', e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="label">Water</div>
                                        <input
                                            className="value-input"
                                            value={healthGoals.target.water}
                                            onChange={(e) => handleTargetChange('water', e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="label">Calories</div>
                                        <input
                                            className="value-input"
                                            type="number"
                                            value={healthGoals.target.calories === 'Write please' ? '' : healthGoals.target.calories}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === '') {
                                                    handleTargetChange('calories', 'Write please');
                                                } else {
                                                    handleTargetChange('calories', value);
                                                }
                                            }}
                                            placeholder="Write please"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="button-container">
                                <button className="button" onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Settings;