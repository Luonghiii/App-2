import React, { FC } from 'react';
import type { Translation } from '../data/translations';

const LoginGuide: FC<{ t: Translation }> = ({ t }) => {
    return (
        <div className="csa-grid-content">
            <section className="csa-box" style={{ width: '100%' }}>
                <h3>📝 Hướng dẫn nhận Lì Xì</h3>
                <ol className="csa-list" style={{ margin: 0, paddingLeft: '24px', lineHeight: 1.6, fontSize: '15px', color: 'var(--csa-muted)' }}>
                    <li style={{marginBottom: '12px'}}>Nhấn vào ô <strong>Email & Mật khẩu</strong> ở trên để sao chép.</li>
                    <li style={{marginBottom: '12px'}}>Vào <strong>App Store</strong> &gt; Avatar góc phải trên &gt; Kéo xuống cuối &gt; <strong>Đăng xuất</strong>.</li>
                    <li style={{marginBottom: '12px'}}>Đăng nhập ID vừa lấy (Paste vào).</li>
                    <li style={{marginBottom: '12px'}}>Nếu hỏi nâng cấp bảo mật: Chọn <strong>"Các lựa chọn khác"</strong> &gt; <strong>"Không nâng cấp"</strong>.</li>
                    <li style={{marginBottom: '12px'}}>Vào mục <strong>Đã mua (Purchased)</strong> &gt; Tải game về chiến Tết!</li>
                </ol>
            </section>
        </div>
    );
};

export default LoginGuide;