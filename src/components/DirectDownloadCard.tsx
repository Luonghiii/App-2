import React, { FC } from 'react';
import { GlowingBorderCard } from './common';
import { InfoIcon, WarningIcon } from './icons';
import type { Translation } from '../data/translations';

interface DirectDownloadCardProps {
    t: Translation;
}

const DirectDownloadCard: FC<DirectDownloadCardProps> = ({ t }) => {
    const handleAction = (url: string) => {
        window.location.href = url;
    };
    
    // Style constants for Dark Luxury theme
    const cardTitleStyle = { color: 'var(--gold-accent)', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' } as React.CSSProperties;
    const infoBoxStyle = { background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '12px', marginBottom: '12px', display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-main)' } as React.CSSProperties;
    const warningBoxStyle = { background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', padding: '12px', marginBottom: '12px', display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-main)' } as React.CSSProperties;
    const appRowStyle = { background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '10px' } as React.CSSProperties;
    const buttonStyle = { background: 'var(--gold-gradient)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px', whiteSpace: 'nowrap', textTransform: 'uppercase' } as React.CSSProperties;

    return (
        <div>
             <h2 className="serif-title gold-text" style={cardTitleStyle}>{t.directDownloadTitle}</h2>
             
             <div style={infoBoxStyle}>
                <InfoIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--success)' }} />
                <span>{t.directDownloadNote}</span>
             </div>
             
             <div style={warningBoxStyle}>
                <WarningIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--danger)' }} />
                <span>{t.deleteOldAppNote}</span>
             </div>

             <div className="mt-4">
                <div style={appRowStyle}>
                    <div className="flex items-center gap-3">
                        <img src="https://i.ibb.co/q322N0H9/IMG-8793.jpg" alt={t.locket} className="w-10 h-10 rounded-lg object-cover shadow-md" />
                        <p style={{ fontWeight: 600, color: '#fff' }}>{t.locket}</p>
                    </div>
                    <button 
                       onClick={() => handleAction("itms-services://?action=download-manifest&url=https://luongdz.vercel.app/Plist/Locket.plist")}
                       onContextMenu={(e) => e.preventDefault()}
                       style={buttonStyle}>
                        {t.install}
                    </button>
                </div>

                <div style={appRowStyle}>
                    <div className="flex items-center gap-3">
                        <img src="https://i.ibb.co/dsq5Q1W3/IMG-8789.png" alt={t.shadowrocket} className="w-10 h-10 rounded-lg object-cover shadow-md" />
                        <p style={{ fontWeight: 600, color: '#fff' }}>{t.shadowrocket}</p>
                    </div>
                    <button 
                       onClick={() => handleAction("itms-services://?action=download-manifest&url=https://luongdz.vercel.app/Plist/Shadowrocket.plist")}
                       onContextMenu={(e) => e.preventDefault()}
                       style={buttonStyle}>
                        {t.install}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DirectDownloadCard;