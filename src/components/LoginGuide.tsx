import React, { FC } from 'react';
import type { Translation } from '../data/translations';

const LoginGuide: FC<{ t: Translation }> = ({ t }) => {
    return (
        <div className="csa-grid-content" style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <section className="csa-box">
                <h3>📝 Hướng dẫn nhận Lì Xì</h3>
                <ol className="csa-list" style={{ margin: 0, paddingLeft: '24px', lineHeight: 1.6, fontSize: '15px', color: 'var(--csa-muted)' }}>
                    <li style={{marginBottom: '12px'}}>Nhấn vào ô <strong>Email & Mật khẩu</strong> ở trên để sao chép.</li>
                    <li style={{marginBottom: '12px'}}>Vào <strong>App Store</strong> &gt; Avatar góc phải trên &gt; Kéo xuống cuối &gt; <strong>Đăng xuất</strong>.</li>
                    <li style={{marginBottom: '12px'}}>Đăng nhập ID vừa lấy (Paste vào).</li>
                    <li style={{marginBottom: '12px'}}>Nếu hỏi nâng cấp bảo mật: Chọn <strong>"Các lựa chọn khác"</strong> &gt; <strong>"Không nâng cấp"</strong>.</li>
                    <li style={{marginBottom: '12px'}}>Vào mục <strong>Đã mua (Purchased)</strong> &gt; Tải game về chiến Tết!</li>
                </ol>
            </section>

            <aside className="csa-box">
                <div className="status-box status-ok" style={{ padding: '16px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '4px solid var(--csa-green)' }}>
                    <h3 style={{color: 'var(--csa-green)', margin: '0 0 8px'}}>✅ NÊN LÀM</h3>
                    <ul className="csa-list-sm" style={{margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--csa-muted)'}}>
                        <li>Đăng xuất ngay sau khi tải.</li>
                        <li>Chỉ dùng tải game.</li>
                    </ul>
                </div>
                <div className="status-box status-no" style={{ padding: '16px', borderRadius: '12px', marginBottom: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '4px solid var(--csa-red)' }}>
                    <h3 style={{color: 'var(--csa-red)', margin: '0 0 8px'}}>⛔ CẤM (BỊ PHẠT)</h3>
                    <ul className="csa-list-sm" style={{margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--csa-muted)'}}>
                        <li>Không đăng nhập iCloud.</li>
                        <li>Không Update iOS.</li>
                    </ul>
                </div>

                <div style={{marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid var(--csa-border)'}}>
                    <h4 style={{color: 'var(--csa-text)', fontSize: '15px', margin: '0 0 12px', textAlign: 'center'}}>🚀 Cộng đồng CSA</h4>
                    <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <a href="https://t.me/idpremiumcsa" target="_blank" className="csa-btn-social btn-tele" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', fontWeight: 600, fontSize: '13px', textDecoration: 'none', transition: '0.2s', whiteSpace: 'nowrap', background: 'rgba(34, 158, 217, 0.2)', color: '#4db8ff', border: '1px solid rgba(34, 158, 217, 0.4)' }}>
                            <i className="fa-brands fa-telegram"></i> Telegram
                        </a>
                        <a href="https://www.facebook.com/groups/csabanquyen" target="_blank" className="csa-btn-social btn-fb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '12px', fontWeight: 600, fontSize: '13px', textDecoration: 'none', transition: '0.2s', whiteSpace: 'nowrap', background: 'rgba(24, 119, 242, 0.2)', color: '#5af', border: '1px solid rgba(24, 119, 242, 0.4)' }}>
                            <i className="fa-brands fa-facebook"></i> Facebook
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default LoginGuide;
