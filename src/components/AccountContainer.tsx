import React, { FC, useState } from 'react';
import type { Account } from '../types';
import type { Translation, Language } from '../data/translations';
import AccountCard from './AccountCard';
import { GlowingBorderCard } from './common';
import { LockIcon, CheckIcon } from './icons';

interface AccountContainerProps {
    accounts: Account[];
    t: Translation;
    language: Language;
    onCopySuccess: (message: string) => void;
    currentTime: Date;
    onUnlockSuccess: () => void;
    totalActiveAccounts: number;
    nationStats: {flag: string, count: number}[];
}

const CORRECT_PASSWORD = 'Luong@07';

const AccountContainer: FC<AccountContainerProps> = ({ accounts, t, language, onCopySuccess, currentTime, onUnlockSuccess, totalActiveAccounts, nationStats }) => {
    const [isLocked, setIsLocked] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === CORRECT_PASSWORD) {
            setIsLocked(false);
            setError('');
            setPassword('');
            onUnlockSuccess();
        } else {
            setError(t.incorrectPasswordError);
            setTimeout(() => setError(''), 3000);
        }
    };
    
    return (
        <GlowingBorderCard
            className="shadow-fuchsia-500/30"
            contentClassName={`
                p-0 overflow-hidden transition-all duration-700 ease-in-out
                ${isLocked ? 'max-h-60' : 'max-h-[1000px]'}
            `}
        >
            {isLocked ? (
                <div className="flex flex-col items-center justify-center p-6 text-center h-60">
                    <LockIcon className="w-8 h-8 text-fuchsia-500 dark:text-fuchsia-400 mb-3" />
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t.passwordPromptTitle}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-xs">{t.passwordPromptSubtitle}</p>
                    <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-sm relative">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder={t.passwordPlaceholder}
                            className="w-full bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2 px-4 text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
                            aria-label={t.passwordPlaceholder}
                        />
                        <button type="submit" className="w-full sm:w-auto px-5 py-2 bg-fuchsia-500/20 backdrop-blur-md border border-fuchsia-400/50 hover:bg-fuchsia-500/30 rounded-lg text-fuchsia-700 dark:text-white font-semibold transition-colors flex-shrink-0">
                            {t.unlockButton}
                        </button>
                        {error && <p className="text-red-500 dark:text-red-400 text-xs mt-2 absolute -bottom-6 left-0 right-0">{error}</p>}
                    </form>
                </div>
            ) : (
                 <div className="animate-fade-in">
                    <style>{`
                        @keyframes fade-in {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        .animate-fade-in { animation: fade-in 0.5s ease-in-out 0.3s backwards; }
                    `}</style>
                    <div className="text-center space-y-4 p-6 border-b border-black/10 dark:border-slate-800">
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t.accountListTitle}</h1>
                        <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-green-600 dark:text-green-300 bg-green-500/10 border border-green-500/30 rounded-full">
                            <CheckIcon className="w-4 h-4" />
                            <span>{totalActiveAccounts} {t.activeAccounts}</span>
                        </div>
                        <div className="flex justify-center items-center gap-4 pt-2 flex-wrap">
                            {nationStats.map(({ flag, count }) => (
                                <div key={flag} className="flex items-center gap-1.5 px-3 py-1 bg-slate-200 dark:bg-slate-700/50 rounded-full text-sm">
                                    <span>{flag}</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="max-h-72 overflow-y-auto custom-scrollbar space-y-4 p-4">
                        {accounts.map((acc, index) => (
                            <AccountCard
                                key={acc.id}
                                account={{ ...acc, id: index + 1 }}
                                t={t}
                                language={language}
                                onCopySuccess={onCopySuccess}
                                currentTime={currentTime}
                            />
                        ))}
                    </div>
                </div>
            )}
        </GlowingBorderCard>
    );
};

export default AccountContainer;
