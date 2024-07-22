import React, { useState, useEffect } from 'react';
import {Button} from "antd";

const Countdown = ({ initialTime, onCountdownComplete }) => {
    const [remainingSeconds, setRemainingSeconds] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(timer);
                    if (onCountdownComplete) {
                        onCountdownComplete();
                    }
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [onCountdownComplete]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSecs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <Button>{formatTime(remainingSeconds)}</Button>
        </div>
    );
};

export default Countdown;
