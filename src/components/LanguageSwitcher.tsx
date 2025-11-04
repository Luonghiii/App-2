import React, { FC } from 'react';
import type { Language } from '../data/translations';
import { SunIcon, MoonIcon } from './icons';

type Theme = 'light' | 'dark';

interface TopControlsProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const TopControls: FC<TopControlsProps> = ({ language, setLanguage, theme, setTheme }) => {
    const toggleLanguage = () => {
      setLanguage(language === 'vi' ? 'en' : 'vi');
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="absolute top-5 right-5 z-[60] flex items-center gap-2">
            <button 
                onClick={toggleTheme} 
                className="flex items-center justify-center w-10 h-10 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors backdrop-blur-md"
                aria-label="Toggle theme"
            >
                {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
            <button 
                onClick={toggleLanguage} 
                className="flex items-center justify-center w-10 h-10 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-white/20 transition-colors backdrop-blur-md"
                aria-label="Toggle language"
            >
                {language === 'vi' ? '🇻🇳' : '🇺🇸'}
            </button>
        </div>
    );
};

export default TopControls;