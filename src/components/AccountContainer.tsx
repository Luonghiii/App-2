import React, { FC, useState } from 'react';
import type { Account } from '../types';
import type { Translation, Language } from '../data/translations';
import AccountCard from './AccountCard';

interface AccountContainerProps {
    accounts: Account[];
    t: Translation;
    onCopySuccess: (message: string) => void;
}

const CORRECT_PASSWORD = 'Luong@07';

const AccountContainer: FC<AccountContainerProps> = ({ accounts, t, onCopySuccess }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsLocked(false);
            setError('');
        } else {
            setError(t.incorrectPasswordError);
        }
    };

    if (isLocked) {
        return (
            <div className="app-box" style={{ 
                textAlign: 'center', alignItems: 'center', justifyContent: 'center', 
                minHeight: '300px', padding: '50px 20px', maxWidth: '400px', margin: '0 auto'
            }}>
                <i className="fa-solid fa-lock gold-text" style={{ fontSize: '48px', marginBottom: '24px' }}></i>
                <h3 className="serif-title" style={{ color: 'var(--text-main)', fontSize: '24px', marginBottom: '12px', fontWeight: 600 }}>{t.passwordPromptTitle}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '14px' }}>{t.passwordPromptSubtitle}</p>
                <form onSubmit={handleUnlock} style={{ width: '100%' }}>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..." 
                        style={{ 
                            width: '100%', padding: '14px 16px', borderRadius: '12px', 
                            border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.3)', 
                            color: 'var(--text-main)', marginBottom: '16px', outline: 'none',
                            transition: 'border-color 0.3s'
                        }}
                    />
                    <button type="submit" style={{
                        width: '100%', padding: '14px', borderRadius: '12px',
                        background: 'var(--gold-gradient)', color: '#000', fontWeight: 600,
                        border: 'none', cursor: 'pointer', fontSize: '15px',
                        textTransform: 'uppercase', letterSpacing: '1px'
                    }}>
                        {t.unlockButton}
                    </button>
                    {error && <p style={{ color: 'var(--danger)', marginTop: '16px', fontSize: '14px' }}>{error}</p>}
                </form>
            </div>
        );
    }

    return (
        <div className="api-container" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px', marginBottom: '30px', width: '100%'
        }}>
            {accounts.map((acc, index) => (
                <AccountCard
                    key={acc.id}
                    account={{ ...acc, id: index + 1 }}
                    t={t}
                    onCopySuccess={onCopySuccess}
                />
            ))}
        </div>
    );
};

export default AccountContainer;
