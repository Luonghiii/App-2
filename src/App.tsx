import React, { useState, FC } from 'react';

// Data and Types
import { translations } from './data/translations';
import { initialAccounts } from './data/accounts';
import type { Account } from './types';

// Components
import Header from './components/Header';
import AccountContainer from './components/AccountContainer';
import DirectDownloadCard from './components/DirectDownloadCard';
import ModuleConfigCard from './components/ModuleConfigCard';
import LuonghiiiCard from './components/LuonghiiiCard';
import Footer from './components/Footer';
import LoginGuide from './components/LoginGuide';

const App: FC = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [accountList] = useState<Account[]>(initialAccounts);
  
  // Mặc định ngôn ngữ Tiếng Việt
  const t = translations['vi'];

  const handleToast = (msg: string) => {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
        {/* Thông báo Toast */}
        <div className={`app-toast ${showToast ? 'show' : ''}`}>
            <div className="app-toast-icon">✓</div>
            <div className="app-toast-msg">{toastMessage}</div>
        </div>

        <div className="page-container" style={{ width: '100%', maxWidth: '1000px', padding: '20px', boxSizing: 'border-box', position: 'relative' }}>
            
            <Header />

            {/* Cảnh báo quan trọng */}
            <div className="app-alert" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '16px', borderRadius: '12px',
                display: 'flex', gap: '14px', marginBottom: '30px',
                fontSize: '15px', lineHeight: 1.5, color: 'var(--text-main)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }}>
                <div style={{ fontSize: '24px' }}>⚠️</div>
                <div>
                    <strong style={{ color: 'var(--danger)' }}>LƯU Ý KỸ:</strong><br/>
                    Chỉ đăng nhập tài khoản tại <strong style={{ color: 'var(--gold-accent)' }}>App Store</strong> để tải game. <br/>
                    Tuyệt đối <strong style={{ color: 'var(--danger)' }}>KHÔNG</strong> đăng nhập vào iCloud (Cài đặt) để tránh bị khóa máy!
                </div>
            </div>

            {/* Danh sách tài khoản (có khóa mật khẩu) */}
            <AccountContainer 
                accounts={accountList}
                t={t}
                onCopySuccess={handleToast}
            />
            
            <LoginGuide t={t} />

            <div style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
                <div className="app-box">
                    <DirectDownloadCard t={t} />
                </div>
                <div className="app-box">
                    <ModuleConfigCard t={t} />
                </div>
                <div className="app-box">
                    <LuonghiiiCard t={t} />
                </div>
            </div>

            <Footer />
        </div>

        {/* Floating Password Banner */}
        <div 
            onClick={() => {
                navigator.clipboard.writeText("Luong@07");
                handleToast("Đã copy: Luong@07");
            }}
            style={{
                position: 'fixed',
                bottom: '24px',
                left: '24px',
                zIndex: 50,
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                animation: 'pulse-gold 2s infinite'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.3)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
            }}
        >
            <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'var(--gold-gradient)', display: 'grid', placeItems: 'center',
                color: '#000', fontSize: '16px', flexShrink: 0
            }}>
                <i className="fa-solid fa-key"></i>
            </div>
            <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '2px' }}>Mật khẩu chung</div>
                <div className="gold-text" style={{ fontWeight: 'bold', fontSize: '15px', letterSpacing: '0.5px' }}>Luong@07</div>
            </div>
            <div style={{ marginLeft: '8px', color: 'var(--text-muted)', fontSize: '14px' }}>
                <i className="fa-regular fa-copy"></i>
            </div>
        </div>
    </>
  );
};

export default App;