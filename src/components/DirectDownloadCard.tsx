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
    
    // Style constants for Gold/White theme
    const cardTitleStyle = { color: 'var(--csa-gold)', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase' } as React.CSSProperties;
    const infoBoxStyle = { background: 'rgba(0, 184, 148, 0.15)', border: '1px solid rgba(0, 184, 148, 0.4)', borderRadius: '8px', padding: '12px', marginBottom: '12px', display: 'flex', gap: '8px', fontSize: '14px', color: '#fff' } as React.CSSProperties;
    const warningBoxStyle = { background: 'rgba(255, 71, 87, 0.15)', border: '1px solid rgba(255, 71, 87, 0.4)', borderRadius: '8px', padding: '12px', marginBottom: '12px', display: 'flex', gap: '8px', fontSize: '14px', color: '#fff' } as React.CSSProperties;
    const appRowStyle = { background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 215, 0, 0.2)', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '10px' } as React.CSSProperties;
    const buttonStyle = { background: 'var(--csa-gold)', color: '#800000', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap' } as React.CSSProperties;

    return (
    <GlowingBorderCard
        className="shadow-cyan-500/30"
        contentClassName=""
    >
        <div>
             <h2 style={cardTitleStyle}>{t.directDownloadTitle}</h2>
             
             <div style={infoBoxStyle}>
                <InfoIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--csa-green)' }} />
                <span>{t.directDownloadNote}</span>
             </div>
             
             <div style={warningBoxStyle}>
                <WarningIcon className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--csa-red)' }} />
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
    </GlowingBorderCard>
    );
};

export default DirectDownloadCard;