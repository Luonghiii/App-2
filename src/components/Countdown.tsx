import React, { FC, useEffect, useState } from 'react';

const Countdown: FC = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const countTo = new Date('Feb 17, 2026 00:00:00').getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const gap = countTo - now;

            if (gap < 0) {
                // If past date, reset or keep at 0
                return; 
            }

            const d = Math.floor(gap / (1000 * 60 * 60 * 24));
            const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((gap % (1000 * 60)) / 1000);

            setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const format = (n: number) => n < 10 ? `0${n}` : n;

    return (
        <>
            <style>{`
                .countdown-box {
                    display: flex; justify-content: center; gap: 15px;
                    margin: -10px 0 30px 0;
                }
                .cd-item {
                    background: linear-gradient(to bottom, #b71540, #000);
                    border: 1px solid var(--csa-gold);
                    padding: 10px; border-radius: 8px; min-width: 60px; text-align: center;
                    box-shadow: 0 0 10px rgba(255,215,0,0.3);
                }
                .cd-num { font-size: 20px; font-weight: bold; color: var(--csa-gold); display: block; font-family: monospace; }
                .cd-label { font-size: 10px; color: #fff; text-transform: uppercase; }
            `}</style>
            <div className="countdown-box">
                <div className="cd-item"><span className="cd-num">{format(timeLeft.days)}</span><span className="cd-label">Ngày</span></div>
                <div className="cd-item"><span className="cd-num">{format(timeLeft.hours)}</span><span className="cd-label">Giờ</span></div>
                <div className="cd-item"><span className="cd-num">{format(timeLeft.minutes)}</span><span className="cd-label">Phút</span></div>
                <div className="cd-item"><span className="cd-num">{format(timeLeft.seconds)}</span><span className="cd-label">Giây</span></div>
            </div>
        </>
    );
};

export default Countdown;
