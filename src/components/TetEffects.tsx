import React, { FC, useEffect, useRef, useState, useCallback } from 'react';

// === LANTERNS ===
interface LanternsProps {
    onCopySecret?: (msg: string) => void;
}

export const Lanterns: FC<LanternsProps> = ({ onCopySecret }) => {
    const handleSecretClick = () => {
        navigator.clipboard.writeText("Luong@07").then(() => {
            if (onCopySecret) {
                onCopySecret("Đã copy mật khẩu bí mật: Luong@07");
            }
        }).catch(err => console.error("Failed to copy:", err));
    };

    return (
        <>
            <div className="lantern-container lantern-left">
                <div className="lantern" onClick={handleSecretClick} title="Nhấn để copy mật khẩu">
                    <div className="lantern-text">Tết</div>
                </div>
            </div>
            <div className="lantern-container lantern-right">
                <div className="lantern"><div className="lantern-text">2026</div></div>
            </div>
        </>
    );
};

// === HORSE TRACK ===
export const HorseTrack: FC<{ enabled: boolean }> = ({ enabled }) => {
    const horseRef = useRef<HTMLDivElement>(null);
    const [horseCount, setHorseCount] = useState(1);
    const [runningRight, setRunningRight] = useState(true);

    useEffect(() => {
        const el = horseRef.current;
        if (!el || !enabled) return;

        // Reset
        el.style.transition = 'none';
        el.style.left = '-300px';
        setRunningRight(true);
        setHorseCount(1);
        
        let timer = setTimeout(() => {
             if (!el) return;
             el.style.transition = 'left 10s linear';
             runHorse(el, true);
        }, 100);

        return () => clearTimeout(timer);
    }, [enabled]);

    const runHorse = (el: HTMLDivElement, right: boolean) => {
        const width = el.offsetWidth;
        const screenW = window.innerWidth;
        if (right) {
            el.style.transform = 'scaleX(1)';
            el.style.left = (screenW + 50) + 'px';
        } else {
            el.style.transform = 'scaleX(-1)';
            el.style.left = (-width - 50) + 'px';
        }
    };

    const handleTransitionEnd = () => {
        const el = horseRef.current;
        if (!el || !enabled) return;
        
        const nextRight = !runningRight;
        setRunningRight(nextRight);
        
        let nextCount = horseCount + 1;
        if (nextCount > 10) nextCount = 1;
        setHorseCount(nextCount);

        // Immediate reset position for next run
        el.style.transition = 'none';
        if (nextRight) {
             el.style.left = '-300px';
        } else {
             el.style.left = (window.innerWidth + 50) + 'px';
        }

        // Trigger reflow
        void el.offsetWidth;

        el.style.transition = 'left 10s linear';
        runHorse(el, nextRight);
    };

    return (
        <div className="horse-track" style={{ display: enabled ? 'block' : 'none' }}>
            <div 
                ref={horseRef} 
                className="running-horse" 
                onTransitionEnd={handleTransitionEnd}
            >
                {Array.from({ length: horseCount }).map((_, i) => (
                    <i key={i} className="fa-solid fa-horse-head" style={{ marginRight: '-8px' }}></i>
                ))}
            </div>
        </div>
    );
};

// === EFFECTS CANVAS (Fireworks & Falling) ===
export const EffectsCanvas: FC<{ enabled: boolean }> = ({ enabled }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fallingRef = useRef<HTMLDivElement>(null);
    const particles = useRef<any[]>([]);
    const animationFrameRef = useRef<number>(0);

    useEffect(() => {
        if (!enabled) {
            if (fallingRef.current) fallingRef.current.innerHTML = '';
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            return;
        }

        // Falling Effects
        const fallingInterval = setInterval(() => {
            if (!fallingRef.current) return;
            const icons = ['🌸', '🌼', '🧧', '✨', '💰'];
            const el = document.createElement('div');
            el.className = 'falling-item';
            el.innerText = icons[Math.floor(Math.random() * icons.length)];
            el.style.left = Math.random() * 100 + 'vw';
            el.style.animationDuration = (Math.random() * 3 + 3) + 's';
            el.style.fontSize = (Math.random() * 15 + 15) + 'px';
            fallingRef.current.appendChild(el);
            setTimeout(() => { if (el.parentElement) el.remove(); }, 6000);
        }, 300);

        // Fireworks
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            x: number; y: number; color: string; velocity: {x: number, y: number}; alpha: number; friction: number;
            constructor(x: number, y: number, color: string) {
                this.x = x; this.y = y; this.color = color;
                this.velocity = { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 };
                this.alpha = 1; this.friction = 0.96;
            }
            draw() {
                if(!ctx) return;
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                this.velocity.x *= this.friction;
                this.velocity.y *= this.friction;
                this.velocity.y += 0.05;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.01;
            }
        }

        const animate = () => {
            if (!enabled) return;
            animationFrameRef.current = requestAnimationFrame(animate);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'source-over';
            
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                if (p.alpha > 0) { p.update(); p.draw(); }
                else particles.current.splice(i, 1);
            }
        };

        const explode = (x: number, y: number) => {
             const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#ffffff', '#FFD700'];
             for (let i = 0; i < 30; i++) {
                 particles.current.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
             }
        };

        const fireworksInterval = setInterval(() => {
            if (!enabled) return;
            explode(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
        }, 800);
        
        const handleClick = (e: MouseEvent) => {
             if (enabled) explode(e.clientX, e.clientY);
        };
        window.addEventListener('click', handleClick);

        animate();

        return () => {
            clearInterval(fallingInterval);
            clearInterval(fireworksInterval);
            window.removeEventListener('resize', resize);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [enabled]);

    return (
        <>
            <canvas ref={canvasRef} id="fireworksCanvas"></canvas>
            <div ref={fallingRef} className="falling-container" id="fallingContainer"></div>
        </>
    );
};

// === MUSIC PLAYER & CONTROLS ===
export const TetControls: FC<{
    onToggleEffects: () => void;
    effectsEnabled: boolean;
}> = ({ onToggleEffects, effectsEnabled }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef<any>(null);
    const youtubeID = "LjeDW43A3xw"; // Provided ID

    useEffect(() => {
        // Load YouTube API if not present
        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        (window as any).onYouTubeIframeAPIReady = () => {
            playerRef.current = new (window as any).YT.Player('youtube-audio', {
                height: '0', width: '0',
                videoId: youtubeID,
                playerVars: {
                    'autoplay': 1, 'loop': 1, 'playlist': youtubeID, 
                    'controls': 0, 'showinfo': 0, 'modestbranding': 1, 'rel': 0,
                    'origin': window.location.origin
                },
                events: {
                    'onReady': (event: any) => {
                        event.target.setVolume(50);
                        event.target.playVideo();
                        setIsPlaying(true);
                    },
                    'onStateChange': (event: any) => {
                        if (event.data === (window as any).YT.PlayerState.PLAYING) {
                            setIsPlaying(true);
                        } else {
                            setIsPlaying(false);
                        }
                    }
                }
            });
        };
    }, []);

    // Auto-play listener logic
    useEffect(() => {
        const unlockAudio = () => {
            if (playerRef.current && typeof playerRef.current.playVideo === 'function' && !isPlaying) {
                playerRef.current.playVideo();
                setIsPlaying(true);
                // Remove listeners after first interaction
                unlockEvents.forEach(evt => document.body.removeEventListener(evt, unlockAudio));
            }
        };

        const unlockEvents = ['click','touchstart','mousemove','scroll','keydown'];
        unlockEvents.forEach(evt => document.body.addEventListener(evt, unlockAudio, { once: false, passive: true }));

        return () => {
             unlockEvents.forEach(evt => document.body.removeEventListener(evt, unlockAudio));
        };
    }, [isPlaying]);

    const toggleMusic = () => {
        if (!playerRef.current || typeof playerRef.current.getPlayerState !== 'function') return;
        
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    return (
        <>
            <div id="youtube-audio" style={{ display: 'none' }}></div>
            <div className="csa-controls">
                <div 
                    className={`csa-ctrl-btn ${!effectsEnabled ? 'off' : ''}`} 
                    onClick={onToggleEffects} 
                    title="Bật/Tắt Hiệu ứng"
                >
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                <div 
                    className={`csa-ctrl-btn ${isPlaying ? 'playing' : 'off'}`} 
                    onClick={toggleMusic} 
                    title="Bật/Tắt Nhạc"
                >
                    {isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-music"></i>}
                </div>
            </div>
        </>
    );
};