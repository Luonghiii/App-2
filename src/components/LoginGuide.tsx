import React, { FC } from 'react';
import type { Translation } from '../data/translations';

const LoginGuide: FC<{ t: Translation }> = ({ t }) => {
    return (
        <div className="app-box" style={{ marginTop: '30px' }}>
            <h3 className="serif-title gold-text" style={{ fontSize: '20px', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>📝 Hướng dẫn nhận Lì Xì</h3>
            <ol style={{ margin: 0, paddingLeft: '24px', lineHeight: 1.8, fontSize: '14px', color: 'var(--text-muted)' }}>
                <li style={{marginBottom: '12px'}}>Nhấn vào ô <strong style={{color: 'var(--text-main)'}}>Email & Mật khẩu</strong> ở trên để sao chép.</li>
                <li style={{marginBottom: '12px'}}>Vào <strong style={{color: 'var(--text-main)'}}>App Store</strong> &gt; Avatar góc phải trên &gt; Kéo xuống cuối &gt; <strong style={{color: 'var(--text-main)'}}>Đăng xuất</strong>.</li>
                <li style={{marginBottom: '12px'}}>Đăng nhập ID vừa lấy (Paste vào).</li>
                <li style={{marginBottom: '12px'}}>Nếu hỏi nâng cấp bảo mật: Chọn <strong style={{color: 'var(--text-main)'}}>"Các lựa chọn khác"</strong> &gt; <strong style={{color: 'var(--text-main)'}}>"Không nâng cấp"</strong>.</li>
                <li style={{marginBottom: '12px'}}>Vào mục <strong style={{color: 'var(--text-main)'}}>Đã mua (Purchased)</strong> &gt; Tải game về chiến!</li>
            </ol>
        </div>
    );
};

export default LoginGuide;