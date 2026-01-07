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
import Countdown from './components/Countdown';
import { Lanterns, HorseTrack, EffectsCanvas, TetControls } from './components/TetEffects';

const App: FC = () => {
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [accountList] = useState<Account[]>(initialAccounts);
  
  // Mặc định ngôn ngữ Tiếng Việt cho giao diện Tết
  const t = translations['vi'];

  const handleToast = (msg: string) => {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
        {/* Các hiệu ứng trang trí Tết */}
        <Lanterns />
        <HorseTrack enabled={effectsEnabled} />
        <EffectsCanvas enabled={effectsEnabled} />
        
        {/* Thông báo Toast */}
        <div className={`csa-toast ${showToast ? 'show' : ''}`}>
            <div className="csa-toast-icon">✓</div>
            <div className="csa-toast-msg">{toastMessage}</div>
        </div>

        {/* Nút điều khiển nhạc và hiệu ứng */}
        <TetControls 
            onToggleEffects={() => setEffectsEnabled(prev => !prev)} 
            effectsEnabled={effectsEnabled} 
        />

        <div className="page-container" style={{ width: '100%', maxWidth: '1000px', padding: '20px', boxSizing: 'border-box', position: 'relative', zIndex: 10 }}>
            
            <Header />
            <Countdown />

            {/* Thông báo chính từ Admin */}
            <div className="csa-notif-box" style={{ 
                background: 'rgba(255, 215, 0, 0.15)',
                border: '2px solid var(--csa-gold)',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)'
            }}>
                <div className="notif-icon" style={{
                    fontSize: '30px', background: 'var(--csa-gold)', color: '#b30000',
                    width: '50px', height: '50px', borderRadius: '50%',
                    display: 'grid', placeItems: 'center', flexShrink: 0
                }}>
                    <i className="fa-solid fa-bell"></i>
                </div>
                <div className="notif-content">
                    <h3 style={{ margin: '0 0 8px 0', color: 'var(--csa-gold)', textTransform: 'uppercase', fontSize: '16px', borderBottom: '1px dashed rgba(255,255,255,0.3)', paddingBottom: '5px', display: 'inline-block' }}>🔔 Thông báo</h3>
                    <p style={{ margin: 0, color: '#fff', lineHeight: 1.5, fontSize: '15px' }}>
                        <b>ĐÓNG ID APPLE VÌ LÝ DO BỊ PHÁ HOẠI</b> <i className="fa-solid fa-triangle-exclamation"></i><br/>
                        XIN CẢM ƠN CÁC BẠN ICLOUD ĐÃ THOÁT FAMILY TẢI APP CỦA ID.<br/>
                        SAU ĐỨA NÀO LOGIN THÌ CHO BAY MÁY NGAY LẬP TỨC, MẸ HIỀN KHÔNG KHÓA MÁY THÌ CHÚNG MÀY PHÁ ID THẾ À
                    </p>
                </div>
            </div>

            {/* Cảnh báo quan trọng */}
            <div className="csa-alert" style={{
                background: 'rgba(139, 0, 0, 0.7)',
                border: '2px solid #ff4757',
                padding: '16px', borderRadius: '16px',
                display: 'flex', gap: '14px', marginBottom: '30px',
                fontSize: '15px', lineHeight: 1.5, color: '#fff',
                boxShadow: '0 0 15px rgba(255, 71, 87, 0.3)'
            }}>
                <div style={{ fontSize: '24px' }}>🧧</div>
                <div>
                    <strong>LÌ XÌ ĐẦU NĂM - LƯU Ý KỸ:</strong><br/>
                    Chỉ đăng nhập tài khoản tại <strong>App Store</strong> để tải game. <br/>
                    Tuyệt đối <strong>KHÔNG</strong> đăng nhập vào iCloud (Cài đặt) để tránh bị khóa máy!
                </div>
            </div>

            {/* Danh sách tài khoản (có khóa mật khẩu) */}
            <AccountContainer 
                accounts={accountList}
                t={t}
                onCopySuccess={handleToast}
            />

            {/* Các nhãn thông tin nhanh */}
            <div className="csa-badges" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px', justifyContent: 'center' }}>
                <div className="csa-badge" style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '30px', fontWeight: 600, border: '1px solid var(--csa-gold)', background: 'rgba(100,0,0,0.5)', color: 'var(--csa-gold)', boxShadow: '0 0 10px rgba(255,215,0,0.2)' }}>🌟 ID Live Tự Động</div>
                <div className="csa-badge" style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '30px', fontWeight: 600, border: '1px solid var(--csa-gold)', background: 'rgba(100,0,0,0.5)', color: 'var(--csa-gold)', boxShadow: '0 0 10px rgba(255,215,0,0.2)' }}>🛡️ An toàn tuyệt đối</div>
                <div className="csa-badge" style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '30px', fontWeight: 600, border: '1px solid var(--csa-gold)', background: 'rgba(100,0,0,0.5)', color: 'var(--csa-gold)', boxShadow: '0 0 10px rgba(255,215,0,0.2)' }}>🧨 Không cần mã 2FA</div>
                <div className="csa-badge" style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '30px', fontWeight: 600, border: '1px solid var(--csa-gold)', background: 'rgba(100,0,0,0.5)', color: 'var(--csa-gold)', boxShadow: '0 0 10px rgba(255,215,0,0.2)' }}>🔔 Tải xong thoát ngay</div>
            </div>
            
            <LoginGuide t={t} />

            <div style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
                <div className="csa-box">
                    <DirectDownloadCard t={t} />
                </div>
                <div className="csa-box">
                    <ModuleConfigCard t={t} />
                </div>
                <div className="csa-box">
                    <LuonghiiiCard t={t} />
                </div>
            </div>

            <Footer />
        </div>
    </>
  );
};

export default App;