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
            <div className="csa-box" style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                <i className="fa-solid fa-lock" style={{ fontSize: '40px', color: 'var(--csa-gold)', marginBottom: '20px' }}></i>
                <h3 style={{ color: '#fff', marginBottom: '10px' }}>{t.passwordPromptTitle}</h3>
                <p style={{ color: 'var(--csa-muted)', marginBottom: '20px' }}>{t.passwordPromptSubtitle}</p>
                <form onSubmit={handleUnlock} style={{ width: '100%', maxWidth: '300px' }}>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu..." 
                        style={{ 
                            width: '100%', padding: '12px', borderRadius: '8px', 
                            border: '1px solid var(--csa-border)', background: 'rgba(0,0,0,0.5)', 
                            color: '#fff', marginBottom: '10px' 
                        }}
                    />
                    <button type="submit" style={{
                        width: '100%', padding: '12px', borderRadius: '8px',
                        background: 'var(--csa-gold)', color: '#800000', fontWeight: 'bold',
                        border: 'none', cursor: 'pointer'
                    }}>
                        {t.unlockButton}
                    </button>
                    {error && <p style={{ color: 'var(--csa-red)', marginTop: '10px' }}>{error}</p>}
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
