import React, { FC, useState, useMemo } from 'react';
import { GlowingBorderCard } from './common';
import type { Translation } from '../data/translations';
import { InfoIcon, SettingsIcon, ShieldIcon, SearchIcon, CheckIcon } from './icons';

interface ModuleInfo {
    name: string;
    fileName: string;
    appId?: string;
    iconUrl?: string; // For custom icons or as a fallback
    working: boolean;
}

// The list of modules with their corresponding App Store IDs, sorted alphabetically
const initialModules: ModuleInfo[] = [
    { name: 'Locket Gold', fileName: 'LocketGold.sgmodule', appId: '1600525061', iconUrl: 'https://i.ibb.co/q322N0H9/IMG-8793.jpg', working: true },
];

interface ModuleConfigCardProps {
    t: Translation;
}

const ModuleConfigCard: FC<ModuleConfigCardProps> = ({ t }) => {
    // Removed dynamic API fetching state to prevent calling iTunes API
    const [modules] = useState<ModuleInfo[]>(initialModules);
    const [searchQuery, setSearchQuery] = useState('');

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

    // Styling
    const cardTitleStyle = { color: 'var(--csa-gold)', fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase' } as React.CSSProperties;
    const subTitleStyle = { color: 'var(--csa-gold)', fontSize: '16px', fontWeight: 600, marginBottom: '12px' } as React.CSSProperties;
    const noteStyle = { background: 'rgba(34, 158, 217, 0.15)', border: '1px solid rgba(34, 158, 217, 0.4)', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', gap: '8px', fontSize: '14px', color: '#fff' } as React.CSSProperties;
    const itemRowStyle = { background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '10px' } as React.CSSProperties;
    const buttonStyle = { background: 'rgba(255, 215, 0, 0.1)', border: '1px solid var(--csa-gold)', color: 'var(--csa-gold)', padding: '6px 14px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '13px' } as React.CSSProperties;
    
    return (
        <GlowingBorderCard
            className="shadow-purple-500/30"
            contentClassName=""
        >
            <div className="space-y-6">
                <h2 style={cardTitleStyle}>{t.moduleConfigTitle}</h2>
                
                <div style={noteStyle}>
                    <InfoIcon className="w-5 h-5 flex-shrink-0" style={{color: '#4db8ff'}} />
                    <div>
                        <p style={{fontWeight: 700, marginBottom: '4px', color: '#4db8ff'}}>{t.moduleNoteTitle}</p>
                        <p style={{lineHeight: 1.4, opacity: 0.9}}>{t.moduleNoteContent}</p>
                    </div>
                </div>

                <div>
                    <h3 style={subTitleStyle}>{t.configurationTitle}</h3>
                    <div className="space-y-3">
                        <div style={itemRowStyle}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                                    <ShieldIcon className="w-6 h-6 text-green-400" />
                                </div>
                                <p style={{fontWeight: 600, color: '#fff'}}>{t.adBlockConfig}</p>
                            </div>
                            <button
                            onClick={() => handleAddConfig("shadowrocket://config/add/https://raw.githubusercontent.com/Luonghiii/Config/refs/heads/main/Module/ads.sgmodule")}
                            style={buttonStyle}>
                                {t.addConfig}
                            </button>
                        </div>

                        <div style={itemRowStyle}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                                    <ShieldIcon className="w-6 h-6 text-amber-400" />
                                </div>
                                <p style={{fontWeight: 600, color: '#fff'}}>{t.locketGoldConfig}</p>
                            </div>
                            <button
                            onClick={() => handleAddConfig("https://luonghiii.github.io/File/Plist/Locketgold.mobileconfig")}
                            style={buttonStyle}>
                                {t.install}
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="flex items-center justify-between mb-3">
                        <span style={subTitleStyle}>{t.moduleListTitle}</span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-900/30 border border-green-500/30 px-3 py-1 rounded-full">
                            <CheckIcon className="w-3 h-3" />
                            <span>{`${activeModulesCount} ${t.modulesActive}`}</span>
                        </span>
                    </h3>

                    <div className="relative mb-3">
                        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder={t.moduleSearchPlaceholder}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-gray-600 rounded-lg py-2.5 pl-11 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-all"
                            style={{borderColor: 'var(--csa-border)'}}
                        />
                    </div>
                    
                    {filteredModules.length > 0 ? (
                        <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                            {filteredModules.map(module => (
                                <div key={module.fileName} style={itemRowStyle}>
                                    <div className="flex items-center gap-3 min-w-0">
                                        {module.iconUrl ? (
                                            <img src={module.iconUrl} alt={module.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center flex-shrink-0">
                                                <SettingsIcon className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <p style={{fontWeight: 600, color: '#fff', fontSize: '14px'}} className="truncate">{module.name}</p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div
                                            className={`relative w-2.5 h-2.5 rounded-full ${
                                                module.working
                                                    ? 'bg-green-500'
                                                    : 'bg-amber-500'
                                            }`}
                                            title={module.working ? t.work : t.notWorking}
                                            style={{boxShadow: module.working ? '0 0 8px #2ecc71' : '0 0 8px #f1c40f'}}
                                        >
                                        </div>
                                        <button
                                           onClick={() => handleAddModule(module.fileName)}
                                           disabled={!module.working}
                                           style={{...buttonStyle, opacity: module.working ? 1 : 0.5, cursor: module.working ? 'pointer' : 'not-allowed'}}>
                                            {t.addModule}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-8">
                            {t.moduleNoResults}
                        </div>
                    )}
                </div>
            </div>
        </GlowingBorderCard>
    );
};

export default ModuleConfigCard;