import React, { FC, useEffect } from 'react';
import type { Language } from '../data/translations';

const loadingTextMap = {
    vi: "Đang khởi tạo giao diện",
    en: "Initializing interface"
};

interface LoadingScreenProps {
    progress: number;
    language: Language;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ progress, language }) => {

    useEffect(() => {
        const avatarContainer = document.querySelector('.avatar-container-loading');
        if (!avatarContainer) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            particle.className = 'particle-loading';

            const rect = avatarContainer.getBoundingClientRect();
            if (rect.width === 0) return;

            particle.style.left = `${rect.left + rect.width / 2}px`;
            particle.style.top = `${rect.top + rect.height / 2}px`;

            document.body.appendChild(particle);

            setTimeout(() => {
                if (particle.parentElement) {
                    particle.parentElement.removeChild(particle);
                }
            }, 3000);
        };

        const intervalId = setInterval(createParticle, 200);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <style>{`
            .loading-screen-3d-root {
                position: fixed;
                inset: 0;
                z-index: 100;
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                overflow: hidden;
                perspective: 1000px;
            }

            .bg-animation-loading {
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2px;
                height: 2px;
                transform-style: preserve-3d;
                animation: rotate-streaks 20s linear infinite;
            }

            @keyframes rotate-streaks {
                from { transform: rotateZ(0deg); }
                to { transform: rotateZ(360deg); }
            }

            .bg-animation-loading span {
                position: absolute;
                width: 2px;
                height: 150px;
                background: linear-gradient(to top, transparent, #a855f7, #fff);
                transform-origin: 50% 0;
                animation: warp-streak 1.5s ease-out infinite;
            }

            .bg-animation-loading span:nth-child(1) { transform: rotateZ(0deg) translateY(-75px); animation-delay: -0.1s; }
            .bg-animation-loading span:nth-child(2) { transform: rotateZ(36deg) translateY(-75px); animation-delay: -0.3s; }
            .bg-animation-loading span:nth-child(3) { transform: rotateZ(72deg) translateY(-75px); animation-delay: -0.5s; }
            .bg-animation-loading span:nth-child(4) { transform: rotateZ(108deg) translateY(-75px); animation-delay: -0.2s; }
            .bg-animation-loading span:nth-child(5) { transform: rotateZ(144deg) translateY(-75px); animation-delay: -0.7s; }
            .bg-animation-loading span:nth-child(6) { transform: rotateZ(180deg) translateY(-75px); animation-delay: -0.9s; }
            .bg-animation-loading span:nth-child(7) { transform: rotateZ(216deg) translateY(-75px); animation-delay: -0.4s; }
            .bg-animation-loading span:nth-child(8) { transform: rotateZ(252deg) translateY(-75px); animation-delay: -0.8s; }
            .bg-animation-loading span:nth-child(9) { transform: rotateZ(288deg) translateY(-75px); animation-delay: -0.6s; }
            .bg-animation-loading span:nth-child(10) { transform: rotateZ(324deg) translateY(-75px); animation-delay: -1s; }

            @keyframes warp-streak {
                0% { transform: scaleY(0) translateZ(-500px); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: scaleY(1) translateZ(500px); opacity: 0; }
            }

            .loading-container-3d {
                text-align: center;
                z-index: 10;
                transform-style: preserve-3d;
                color: white;
            }

            .avatar-container-loading {
                position: relative;
                margin: 0 auto 40px;
                width: 250px;
                height: 250px;
                transform-style: preserve-3d;
                animation: float-gate 6s ease-in-out infinite;
                transform: rotateX(60deg);
            }

            @keyframes float-gate {
                0%, 100% { transform: rotateX(60deg) translateY(0px) rotateZ(0deg); }
                50% { transform: rotateX(65deg) translateY(-10px) rotateZ(5deg); }
            }

            .ring-loading {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 2px solid;
                animation: spin-gate 8s linear infinite;
                box-shadow: none;
            }

            .ring-loading:nth-child(1) {
                width: 100%; height: 100%; top: 0; left: 0;
                border-color: #3b82f6;
                animation-duration: 8s;
            }
            .ring-loading:nth-child(2) {
                width: 80%; height: 80%; top: 10%; left: 10%;
                border-color: #a855f7;
                animation-direction: reverse;
                animation-duration: 6s;
            }
            .ring-loading:nth-child(3) {
                width: 60%; height: 60%; top: 20%; left: 20%;
                border-color: #f472b6;
                animation-duration: 10s;
            }

            @keyframes spin-gate {
                to { transform: rotateZ(360deg); }
            }

            .dot-loading {
                display: block;
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 0 10px #fff, 0 0 20px #a855f7;
            }

            .dot-loading:nth-child(4) { animation: scanner1 8s linear infinite; }
            .dot-loading:nth-child(5) { animation: scanner2 6s linear infinite reverse; }
            .dot-loading:nth-child(6) { display: none; }
            .dot-loading:nth-child(7) { display: none; }

            @keyframes scanner1 {
                from { transform: rotateZ(0deg) translateX(125px); }
                to { transform: rotateZ(360deg) translateX(125px); }
            }
            @keyframes scanner2 {
                from { transform: rotateZ(0deg) translateX(100px); }
                to { transform: rotateZ(360deg) translateX(100px); }
            }

            .avatar-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotateX(-60deg);
                width: 100px;
                height: 100px;
                border-radius: 50%;
                overflow: hidden;
                border: 2px solid #a855f7;
                animation: pulse-core 2s ease-in-out infinite;
            }

            @keyframes pulse-core {
                0%, 100% { box-shadow: 0 0 20px 2px #a855f7, inset 0 0 10px #a855f7; }
                50% { box-shadow: 0 0 35px 5px #d946ef, inset 0 0 15px #d946ef; }
            }

            .avatar-loading img { width: 100%; height: 100%; object-fit: cover; }

            .username-loading, .loading-text-3d, .percentage-3d {
                animation: text-flicker 3s infinite;
            }

            @keyframes text-flicker {
                0%, 100% { opacity: 1; text-shadow: 0 0 5px #fff, 0 0 10px #a855f7; }
                50% { opacity: 0.9; text-shadow: 0 0 8px #fff, 0 0 15px #a855f7; }
            }

            .username-loading { font-size: 36px; font-weight: 700; color: white; margin-bottom: 20px; }
            .loading-text-3d { font-size: 18px; color: rgba(255, 255, 255, 0.7); margin-bottom: 30px; letter-spacing: 2px; }

            .loading-text-3d::after {
                content: '';
                animation: dots-loading 1.5s steps(4, end) infinite;
            }

            @keyframes dots-loading {
                0%, 20% { content: ''; }
                40% { content: '.'; }
                60% { content: '..'; }
                80%, 100% { content: '...'; }
            }

            .progress-container-3d {
                width: 400px;
                max-width: 90vw;
                height: 10px;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 10px;
                overflow: hidden;
                border: 1px solid #a855f7;
                box-shadow: inset 0 0 5px #a855f7;
            }

            .progress-bar-3d {
                height: 100%;
                background: linear-gradient(90deg, #d946ef 0%, #a855f7 100%);
                border-radius: 10px;
                width: 0%;
                transition: width 0.5s ease-out;
                box-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7;
                animation: pulse-bar 1s infinite;
            }

            .progress-bar-3d::before { content: none; }

            @keyframes pulse-bar {
                0%, 100% { box-shadow: 0 0 10px #a855f7, 0 0 20px #a855f7; }
                50% { box-shadow: 0 0 15px #d946ef, 0 0 30px #d946ef; }
            }

            .percentage-3d { color: #fff; font-size: 14px; margin-top: 15px; font-weight: 600; }

            .particle-loading { display: none; }

            @media (max-width: 768px) {
                .username-loading { font-size: 28px; }
                .avatar-container-loading { width: 200px; height: 200px; }
                .avatar-loading { width: 80px; height: 80px; }
                @keyframes scanner1 {
                    from { transform: rotateZ(0deg) translateX(100px); }
                    to { transform: rotateZ(360deg) translateX(100px); }
                }
                @keyframes scanner2 {
                    from { transform: rotateZ(0deg) translateX(80px); }
                    to { transform: rotateZ(360deg) translateX(80px); }
                }
            }
            `}</style>
            <div className="loading-screen-3d-root">
                <div className="bg-animation-loading">
                    {Array.from({ length: 10 }).map((_, i) => <span key={i}></span>)}
                </div>

                <div className="loading-container-3d">
                    <div className="avatar-container-loading">
                        <div className="ring-loading"></div>
                        <div className="ring-loading"></div>
                        <div className="ring-loading"></div>
                        <div className="dot-loading"></div>
                        <div className="dot-loading"></div>
                        <div className="dot-loading"></div>
                        <div className="dot-loading"></div>
                        
                        <div className="avatar-loading">
                            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Avatar" />
                        </div>
                    </div>

                    <h1 className="username-loading">Luonghiii</h1>
                    <p className="loading-text-3d">{loadingTextMap[language]}</p>

                    <div className="progress-container-3d">
                        <div className="progress-bar-3d" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="percentage-3d">{Math.floor(progress)}%</div>
                </div>
            </div>
        </>
    );
};

export default LoadingScreen;