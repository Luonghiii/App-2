import React, { FC, useEffect, useState, useMemo } from 'react';
import { GlowingBorderCard } from './common';
import type { Translation } from '../data/translations';
import { InfoIcon, SettingsIcon, ShieldIcon, SearchIcon, CheckIcon } from './icons';

// Interfaces for iTunes API and module data
interface ITunesResult {
    artworkUrl100: string;
    trackId: number;
}

interface ModuleInfo {
    name: string;
    fileName: string;
    appId?: string;
    iconUrl?: string; // For custom icons or as a fallback
    working: boolean;
}

interface ModuleData extends ModuleInfo {
    fetchedIconUrl?: string;
}

// The list of modules with their corresponding App Store IDs, sorted alphabetically
const initialModules: ModuleInfo[] = [
    { name: 'Locket Gold', fileName: 'LocketGold.sgmodule', appId: '1600525061', working: true },
];


interface ModuleConfigCardProps {
    t: Translation;
}

const ModuleConfigCard: FC<ModuleConfigCardProps> = ({ t }) => {
    const [modules, setModules] = useState<ModuleData[]>(initialModules.map(m => ({ ...m })));
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchModuleIcons = async () => {
            const modulesWithAppId = initialModules.filter(m => m.appId);
            if (modulesWithAppId.length === 0) return;

            try {
                const appIds = modulesWithAppId.map(m => m.appId).join(',');
                const url = `https://itunes.apple.com/lookup?id=${appIds}&country=us`;
                const response = await fetch(url);
                const data = await response.json();
                
                const results: ITunesResult[] = data.results;
                
                setModules(currentModules => 
                    currentModules.map(module => {
                        const apiData = results.find(r => r.trackId.toString() === module.appId);
                        if (apiData) {
                            return {
                                ...module,
                                fetchedIconUrl: apiData.artworkUrl100,
                            };
                        }
                        return module;
                    })
                );
            } catch (error) {
                console.error("Failed to fetch module icons:", error);
            }
        };

        fetchModuleIcons();
    }, []);

    const filteredModules = useMemo(() => {
        return modules.filter(module =>
            module.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [modules, searchQuery]);

    const activeModulesCount = useMemo(() => {
        return initialModules.filter(module => module.working).length;
    }, []);

    const handleAddModule = (fileName: string) => {
        const url = `shadowrocket://install?module=https://raw.githubusercontent.com/Luonghiii/Config/refs/heads/main/Module/${fileName}`;
        window.location.href = url;
    };

    const handleAddConfig = (url: string) => {
        window.location.href = url;
    };
    
    return (
        <GlowingBorderCard
            className="shadow-purple-500/30"
            contentClassName="p-6"
        >
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.moduleConfigTitle}</h2>
                
                <div className="bg-sky-500/10 dark:bg-sky-900/50 border border-sky-500/50 p-3 rounded-lg flex items-start gap-3 text-sm text-sky-800 dark:text-sky-200">
                    <InfoIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-sky-500 dark:text-sky-400" />
                    <div>
                        <p className="font-semibold mb-1">{t.moduleNoteTitle}</p>
                        <p>{t.moduleNoteContent}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">{t.configurationTitle}</h3>
                    <div className="bg-black/5 dark:bg-slate-800/50 p-3 rounded-lg flex items-center justify-between gap-4 hover:bg-black/10 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                                <ShieldIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
                            </div>
                            <p className="font-semibold text-slate-700 dark:text-slate-200">{t.adBlockConfig}</p>
                        </div>
                        <button
                           onClick={() => handleAddConfig("shadowrocket://config/add/https://raw.githubusercontent.com/Luonghiii/Config/refs/heads/main/Module/ads.sgmodule")}
                           className="flex-shrink-0 px-4 py-2 bg-purple-500/20 backdrop-blur-md border border-purple-400/50 hover:bg-purple-500/30 rounded-lg text-white font-semibold transition-colors text-sm">
                            {t.addConfig}
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="flex items-center justify-between text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">
                        <span>{t.moduleListTitle}</span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-300 bg-green-500/10 px-3 py-1 rounded-full">
                            <CheckIcon className="w-3 h-3" />
                            <span>{`${activeModulesCount} ${t.modulesActive}`}</span>
                        </span>
                    </h3>

                    <div className="relative mb-3">
                        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                        <input
                            type="text"
                            placeholder={t.moduleSearchPlaceholder}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-200 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 pl-11 pr-4 text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>
                    
                    {filteredModules.length > 0 ? (
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {filteredModules.map(module => (
                                <div key={module.fileName} className="bg-black/5 dark:bg-slate-800/50 p-2 rounded-lg flex items-center justify-between gap-4 hover:bg-black/10 dark:hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {module.fetchedIconUrl || module.iconUrl ? (
                                            <img src={module.fetchedIconUrl || module.iconUrl} alt={module.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                                                <SettingsIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                                            </div>
                                        )}
                                        <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm truncate">{module.name}</p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div
                                            className={`relative w-2.5 h-2.5 rounded-full ${
                                                module.working
                                                    ? 'bg-green-500/30'
                                                    : 'bg-amber-500/30'
                                            }`}
                                            title={module.working ? t.work : t.notWorking}
                                        >
                                            <div className={`absolute inset-0 rounded-full ${
                                                module.working
                                                    ? 'shadow-[0_0_6px_rgba(34,197,94,0.7)]'
                                                    : 'shadow-[0_0_6px_rgba(245,158,11,0.7)]'
                                            }`}></div>
                                            <div className={`absolute inset-0 rounded-full ring-1 ${
                                                module.working
                                                    ? 'ring-green-300/50'
                                                    : 'ring-amber-300/50'
                                            }`}></div>
                                        </div>
                                        <button
                                           onClick={() => handleAddModule(module.fileName)}
                                           disabled={!module.working}
                                           className="flex-shrink-0 px-4 py-2 bg-purple-500/20 backdrop-blur-md border border-purple-400/50 hover:bg-purple-500/30 rounded-lg text-white font-semibold transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-purple-500/20">
                                            {t.addModule}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                            {t.moduleNoResults}
                        </div>
                    )}
                </div>
            </div>
        </GlowingBorderCard>
    );
};

export default ModuleConfigCard;