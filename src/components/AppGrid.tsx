import React, { FC, useEffect, useState, useMemo } from 'react';
import { appGridList, AppInfo } from '../data/apps';
import { GlowingBorderCard } from './common';
import { SearchIcon } from './icons';
import type { Translation } from '../data/translations';

interface ITunesResult {
    artworkUrl100: string;
    trackName: string;
    sellerName: string;
    trackId: number;
}

interface AppData extends AppInfo {
    artworkUrl: string;
    sellerName: string;
}

const isiOS = () => /iPhone|iPad|iPod/i.test(navigator.userAgent) && !(window as any).MSStream;

function tryOpenByScheme(scheme: string, fallbackUrl: string) {
    let timeout: number;
    const onVisibilityChange = () => {
        if (document.hidden) {
            window.clearTimeout(timeout);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.location.href = scheme;
    timeout = window.setTimeout(() => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.location.href = fallbackUrl;
    }, 1200);
}

const AppGrid: FC<{ t: Translation }> = ({ t }) => {
    const [apps, setApps] = useState<AppData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAppInfo = async () => {
            try {
                const appIds = appGridList.map(a => a.id).join(',');
                const url = `https://itunes.apple.com/lookup?id=${appIds}&country=us`;
                const response = await fetch(url);
                const data = await response.json();
                
                const results: ITunesResult[] = data.results;
                const combinedData = appGridList.map(localApp => {
                    const apiData = results.find(r => r.trackId.toString() === localApp.id);
                    if (!apiData) return null;
                    return {
                        ...localApp,
                        artworkUrl: apiData.artworkUrl100.replace(/100x100bb/i, '256x256bb'),
                        sellerName: apiData.sellerName,
                    };
                }).filter((app): app is AppData => app !== null);
                
                setApps(combinedData);
            } catch (error) {
                console.error("Failed to fetch app info:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppInfo();
    }, []);
    
    const filteredApps = useMemo(() => {
        return apps.filter(app =>
            app.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [apps, searchQuery]);

    const handleAppClick = (app: AppData) => {
        const itmsLink = `itms-apps://itunes.apple.com/app/id${app.id}`;
        const webLink = `https://apps.apple.com/app/id${app.id}`;

        if (isiOS()) {
            if (app.scheme) {
                tryOpenByScheme(app.scheme, itmsLink);
            } else {
                window.location.href = itmsLink;
            }
        } else {
            window.open(webLink, '_blank');
        }
    };
    
    if (isLoading && apps.length === 0) {
        return (
             <GlowingBorderCard className="shadow-cyan-500/30" contentClassName="p-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t.appGridTitle}</h2>
                <div className="text-center text-slate-500 dark:text-slate-400">{t.appGridLoading}</div>
            </GlowingBorderCard>
        );
    }
    
    if (apps.length === 0 && !isLoading) return null;

    return (
        <GlowingBorderCard className="shadow-cyan-500/30" contentClassName="p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">{t.appGridTitle}</h2>
            
            <div className="relative mb-4">
                <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                    type="text"
                    placeholder={t.appGridSearchPlaceholder}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 pl-11 pr-4 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
            </div>
            
            {filteredApps.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                    {filteredApps.map(app => (
                        <div key={app.id} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <img src={app.artworkUrl} alt={app.title} className="w-14 h-14 rounded-xl object-cover shadow-lg flex-shrink-0" loading="lazy" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">{app.title}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{app.sellerName}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => handleAppClick(app)}
                                className="flex-shrink-0 px-4 py-2 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 rounded-lg text-slate-700 dark:text-white font-semibold transition-colors text-xs"
                            >
                                {t.appGridButton}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                    {t.appGridNoResults}
                </div>
            )}
        </GlowingBorderCard>
    );
};

export default AppGrid;
