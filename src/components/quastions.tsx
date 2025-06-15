import { useState } from 'react';
import logobig from '../img/quastions/logobig.svg';
import '../style/quastions.css';
import 'react-circular-progressbar/dist/styles.css';
import AnimatedProgress from "./AnimatedProgress.tsx";


function Quastions() {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const navigate = useNavigate();

    const quastions = [
        {
            "quastion": "What is your main health goal right now?",
            "answears": ["Lose weight", "Gain muscle", "Improve digestion", "Have more energy"]
        },
        {
            "quastion": "How active are you?",
            "answears": ["Not very active", "Light activity (walking, stretching)", "Moderate exercise a few times a week", "Very active or train regularly"]
        },
        {
            "quastion": "What’s your energy like during the day?",
            "answears": ["Tired most of the time", "Energetic in the morning, tired later", "Up and down", "Very energetic"]
        },
        {
            "quastion": "Do you have any dietary preferences?",
            "answears": ["Vegetarian", "Vegan", "Low-carb / Keto", "Pescatarian", "Kosher", "No sugar"]
        },
        {
            "quastion": "Would you be open to receiving a personalised nutrition plan?",
            "answears": ["Yes, I’d love that", "I prefer general tips", "Not interested"]
        },
    ];

    const sendAnswerToBackend = async (question: string, answer: string) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                'Authorization': token
            };

            const response = await fetch('/api/answers', {
                method: 'POST',
                headers,
                body: JSON.stringify({ [question]: answer }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Ответ сохранён:', data);
                return true;
            } else {
                console.error('Ошибка:', data.error);
                return false;
            }
        } catch (error) {
            console.error('Ошибка отправки:', error);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAnswerClick = async (question: string, answer: string) => {
        if (isSubmitting) return;

        const updatedAnswers = {
            ...selectedAnswers,
            [question]: answer
        };
        setSelectedAnswers(updatedAnswers);

        const success = await sendAnswerToBackend(question, answer);

        if (success) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Failed to save answer. Please try again.');
        }
    };

    return (
        <div>
            <img src={logobig} alt="" className="logobig" />
            {currentQuestionIndex < quastions.length ? (
                <div className="box-quastions">
                    <h1>{quastions[currentQuestionIndex].quastion}</h1>
                    <ul>
                        {quastions[currentQuestionIndex].answears.map((answear, index) => (
                            <li
                                key={index}
                                onClick={() => handleAnswerClick(quastions[currentQuestionIndex].quastion, answear)}
                                style={{ cursor: isSubmitting ? 'wait' : 'pointer' }}

                            >
                                {answear}
                            </li>
                        ))}
                    </ul>
                    {isSubmitting && <p>Saving answer...</p>}
                </div>
            ) : (
                <AnimatedProgress />
            )}

        </div>


    );
}

export default Quastions;