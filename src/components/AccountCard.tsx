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
            const successMessages = [
                "Đã copy thành công!",
                "Đã lưu vào bộ nhớ tạm!",
                "Copy thành công!"
            ];
            const randomMsg = successMessages[Math.floor(Math.random() * successMessages.length)];
            onCopySuccess(`${randomMsg} ${label}`);
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
        <div className="app-box" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                <span style={{ fontWeight: 600, color: 'var(--gold-accent)', fontSize: '14px', letterSpacing: '0.5px' }}>Apple ID #{account.id}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-main)', background: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '20px' }}>{account.flag} {account.nation}</span>
            </div>

            <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '16px' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>Email</span>
                    <div 
                        onClick={() => handleCopy(account.email, "Email")}
                        style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', padding: '12px' }}
                    >
                        <span style={{ flex: 1, fontFamily: 'monospace', fontSize: '14px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {maskEmail(account.email)}
                        </span>
                        <i className="fa-regular fa-copy" style={{ color: 'var(--gold-accent)' }}></i>
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>Mật khẩu</span>
                    <div 
                        onClick={() => handleCopy(account.password_plain, "Mật khẩu")}
                        style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', cursor: 'pointer', padding: '12px' }}
                    >
                        <span style={{ flex: 1, fontFamily: 'monospace', fontSize: '14px', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {maskedPassword}
                        </span>
                        <i className="fa-regular fa-copy" style={{ color: 'var(--gold-accent)' }}></i>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: account.status === 'Work' ? 'var(--success)' : 'var(--danger)', boxShadow: `0 0 8px ${account.status === 'Work' ? 'var(--success)' : 'var(--danger)'}` }}></span>
                        {account.status === 'Work' ? t.work : 'Bảo trì'}
                    </span>
                    <span>{new Date(account.lastUpdate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AccountCard);