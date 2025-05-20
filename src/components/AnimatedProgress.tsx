import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';


function AnimatedProgress() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (value >= 100) return;

        const timer = setInterval(() => {
            setValue((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 50);

        return () => clearInterval(timer);
    }, [value]);

    if (value === 100) {
        document.getElementsByClassName("box-quastions")[0].classList.add("hidden");
        return(
            <div className="ready">
                <h2>Your Personalized Plan is Ready!</h2>
                <p>Please log in to access it.</p>
                <button className="login_button" onClick={()=>navigate("/signup")}>Log in</button>
            </div>

        );
    }
    else{
        return (

            <div className="box-quastions">
                <h1>Thank you so much for completing the quiz! 💚</h1>
                <p style={{marginTop:"32px"}}>We’re now preparing your personalized diet plan based on your answers.</p>
                {/*<button onClick={()=>navigate("/signup")}>Login in</button>*/}
                {/*<AnimatedProgress />*/}
                <div style={{ width: 250, height: 120 }}>
                    <CircularProgressbar
                        value={value}
                        styles={buildStyles({
                            pathColor: '#4f772d',
                            trailColor: '#cacaca',
                        })}
                    />
                </div>


            </div>
        );
    }

}

export default AnimatedProgress;