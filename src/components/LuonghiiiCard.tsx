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
        <div style={{
            width: '80px', height: '80px', flexShrink: 0,
            borderRadius: '50%', overflow: 'hidden',
            border: '2px solid var(--gold-accent)',
            boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
            zIndex: 1
        }}>
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Luonghiii" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
            <h2 className="serif-title gold-text" style={{ 
                margin: '0 0 6px 0', 
                fontSize: '22px', 
                fontWeight: 'bold', 
                letterSpacing: '1px'
            }}>Luonghiii</h2>
            
            <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {t.luonghiiiDescription}
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
                <a href="https://luonghiii.github.io/web/profile/" target="_blank" rel="noopener noreferrer" aria-label="Website" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--gold-accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <GlobeIcon className="w-5 h-5" />
                </a>
                <a href="https://t.me/luonghiii1" target="_blank" rel="noopener noreferrer" aria-label="Telegram" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--gold-accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <TelegramIcon className="w-5 h-5" />
                </a>
                <a href="https://facebook.com/luonghiii" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--gold-accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <FacebookIcon className="w-5 h-5" />
                </a>
                <a href="https://zalo.me/0916508081" target="_blank" rel="noopener noreferrer" aria-label="Zalo" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--gold-accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
                    <ZaloIcon className="w-5 h-5" />
                </a>
            </div>
        </div>
    </div>
);

export default LuonghiiiCard;