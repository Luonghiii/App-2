import React, { FC } from 'react';
import { GlobeIcon, TelegramIcon, FacebookIcon, ZaloIcon } from './icons';
import type { Translation } from '../data/translations';

interface LuonghiiiCardProps {
    t: Translation;
}

const LuonghiiiCard: FC<LuonghiiiCardProps> = ({t}) => (
    <div className="profile-card-horizontal group">
        <div className="glow-horizontal bg-gradient-to-r from-rose-500/20 to-purple-500/20"></div>
        
        <div className="avatar-horizontal">
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Luonghiii" />
        </div>
        
        <div className="info-horizontal flex-1 min-w-0">
            <h2 className="name-horizontal text-slate-800 dark:text-white">Luonghiii</h2>
            <p className="description-horizontal text-slate-600 dark:text-slate-400">
                {t.luonghiiiDescription}
            </p>
            
            <div className="social-icons-horizontal">
                <a href="https://luonghiii.github.io/web/profile/" target="_blank" rel="noopener noreferrer" aria-label="Website" className="social-icon text-slate-600 dark:text-slate-300">
                    <GlobeIcon />
                </a>
                <a href="https://t.me/luonghiii1" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="social-icon text-slate-600 dark:text-slate-300">
                    <TelegramIcon />
                </a>
                <a href="https://facebook.com/luonghiii" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon text-slate-600 dark:text-slate-300">
                    <FacebookIcon />
                </a>
                <a href="https://zalo.me/0916508081" target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="social-icon text-slate-600 dark:text-slate-300">
                    <ZaloIcon />
                </a>
            </div>
        </div>
    </div>
);

export default LuonghiiiCard;