import React, { FC } from 'react';
import type { Account } from '../types';
import type { Translation } from '../data/translations';

interface AccountCardProps {
    account: Account;
    t: Translation;
    onCopySuccess: (message: string) => void;
}

const AccountCard: FC<AccountCardProps> = ({ account, t, onCopySuccess }) => {
    
    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            const tetWishes = [
                "Chúc bạn năm mới Vạn Sự Như Ý! 🌸",
                "Tiền vô như nước, Tiền ra nhỏ giọt! 💰",
                "Mã đáo thành công, tấn tài tấn lộc! 🐎",
                "Sức khỏe dồi dào, an khang thịnh vượng! ❤️",
                "Năm mới thắng lợi mới, game nào cũng Win! 🎮",
                "Lộc biếc mai vàng, xuân sang hạnh phúc! 🌼",
                "Phát tài phát lộc, sung túc cả năm! 🧧"
            ];
            const randomWish = tetWishes[Math.floor(Math.random() * tetWishes.length)];
            onCopySuccess(`Đã copy ${label}! ${randomWish}`);
        });
    };

    const maskEmail = (email: string) => {
        const parts = email.split('@');
        if (parts.length < 2) return email;
        const name = parts[0];
        // Show first 5 chars, append ***.com as requested style
        // e.g. luonghiii@icloud.com -> luong***.com
        const visibleName = name.slice(0, 5);
        return `${visibleName}***.com`;
    };

    const maskedPassword = "*****";

    return (
        <div className="csa-acc-card" style={{
            background: 'rgba(50, 0, 0, 0.6)',
            border: '1px solid var(--csa-border)',
            borderRadius: '18px', overflow: 'hidden',
            backdropFilter: 'blur(8px)',
            transition: 'transform 0.3s ease, boxShadow 0.3s ease',
            display: 'flex', flexDirection: 'column',
            position: 'relative'
        }}>
             {/* Decor corner */}
             <div style={{
                position: 'absolute', top: 0, left: 0,
                width: '40px', height: '40px',
                background: 'linear-gradient(135deg, var(--csa-gold) 50%, transparent 50%)',
                opacity: 0.8, pointerEvents: 'none', zIndex: 2
             }} />

            <div className="csa-acc-header" style={{
                 background: 'linear-gradient(90deg, #c0392b, #d35400)',
                 padding: '10px 16px', color: '#fff', fontWeight: 700, fontSize: '13px',
                 display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                 borderBottom: '1px solid rgba(255,255,255,0.2)'
            }}>
                <span><i className="fa-brands fa-apple"></i> Apple ID #{account.id}</span>
                <span>{account.flag} {account.nation}</span>
            </div>

            <div className="csa-acc-body" style={{ padding: '16px' }}>
                <div className="csa-field" style={{ marginBottom: '12px' }}>
                    <span className="csa-label" style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--csa-muted)', marginBottom: '4px', display: 'block', fontWeight: 600 }}>Email</span>
                    <div 
                        className="csa-input-wrap" 
                        onClick={() => handleCopy(account.email, "Email")}
                        style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--csa-border)', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        <span className="csa-value" style={{ flex: 1, padding: '10px 12px', fontFamily: 'monospace', fontSize: '14px', color: 'var(--csa-gold)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold' }}>
                            {maskEmail(account.email)}
                        </span>
                        <i className="fa-regular fa-copy csa-copy-icon" style={{ padding: '0 12px', color: 'var(--csa-green)' }}></i>
                    </div>
                </div>

                <div className="csa-field" style={{ marginBottom: '12px' }}>
                    <span className="csa-label" style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--csa-muted)', marginBottom: '4px', display: 'block', fontWeight: 600 }}>Mật khẩu</span>
                    <div 
                        className="csa-input-wrap" 
                        onClick={() => handleCopy(account.password_plain, "Mật khẩu")}
                        style={{ display: 'flex', alignItems: 'center', background: 'rgba(0, 0, 0, 0.4)', border: '1px solid var(--csa-border)', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        <span className="csa-value" style={{ flex: 1, padding: '10px 12px', fontFamily: 'monospace', fontSize: '14px', color: 'var(--csa-gold)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold' }}>
                            {maskedPassword}
                        </span>
                        <i className="fa-regular fa-copy csa-copy-icon" style={{ padding: '0 12px', color: 'var(--csa-green)' }}></i>
                    </div>
                </div>

                <div className="csa-meta" style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,215,0,0.3)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--csa-muted)' }}>
                    <span>
                        <span className={`status-dot ${account.status === 'Work' ? 'st-true' : 'st-false'}`} style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '6px', background: account.status === 'Work' ? 'var(--csa-green)' : 'var(--csa-red)', boxShadow: account.status === 'Work' ? '0 0 8px var(--csa-green)' : 'none' }}></span>
                        {account.status === 'Work' ? t.work : 'Bảo trì'}
                    </span>
                    <span><i className="fa-solid fa-clock"></i> Cập nhật: {new Date(account.lastUpdate).toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AccountCard);