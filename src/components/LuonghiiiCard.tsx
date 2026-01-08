import React, { FC } from 'react';
import { GlobeIcon, TelegramIcon, FacebookIcon, ZaloIcon } from './icons';
import type { Translation } from '../data/translations';

interface LuonghiiiCardProps {
    t: Translation;
}

const LuonghiiiCard: FC<LuonghiiiCardProps> = ({t}) => (
    <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        position: 'relative',
        overflow: 'hidden'
    }}>
        {/* Glow effect simplified */}
        <div style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(90deg, rgba(183,21,64,0.1), rgba(255,215,0,0.05))',
            zIndex: 0, pointerEvents: 'none'
        }}></div>
        
        <div style={{
            width: '80px', height: '80px', flexShrink: 0,
            borderRadius: '50%', overflow: 'hidden',
            border: '2px solid var(--csa-gold)',
            boxShadow: '0 0 15px rgba(255,215,0,0.3)',
            zIndex: 1
        }}>
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Luonghiii" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
            <h2 style={{ 
                margin: '0 0 6px 0', 
                fontSize: '20px', 
                fontWeight: 'bold', 
                color: 'var(--csa-gold)',
                textTransform: 'uppercase'
            }}>Luonghiii</h2>
            
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: 'var(--csa-text)', opacity: 0.9 }}>
                {t.luonghiiiDescription}
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
                <a href="https://luonghiii.github.io/web/profile/" target="_blank" rel="noopener noreferrer" aria-label="Website" style={{ color: 'var(--csa-muted)', transition: '0.2s' }}>
                    <GlobeIcon className="w-6 h-6 hover:text-white" />
                </a>
                <a href="https://t.me/luonghiii1" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ color: 'var(--csa-muted)', transition: '0.2s' }}>
                    <TelegramIcon className="w-6 h-6 hover:text-white" />
                </a>
                <a href="https://facebook.com/luonghiii" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--csa-muted)', transition: '0.2s' }}>
                    <FacebookIcon className="w-6 h-6 hover:text-white" />
                </a>
                <a href="https://zalo.me/0916508081" target="_blank" rel="noopener noreferrer" aria-label="Zalo" style={{ color: 'var(--csa-muted)', transition: '0.2s' }}>
                    <ZaloIcon className="w-6 h-6 hover:text-white" />
                </a>
            </div>
        </div>
    </div>
);

export default LuonghiiiCard;