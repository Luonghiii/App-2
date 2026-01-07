import React, { FC } from 'react';

const Header: FC = () => (
    <header className="csa-header" style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        marginBottom: '24px', paddingBottom: '20px',
        borderBottom: '2px solid var(--csa-border)',
        position: 'relative', marginTop: '20px'
    }}>
        <div className="csa-logo" style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #b71540, #000)',
            borderRadius: '50%', display: 'grid', placeItems: 'center',
            fontSize: '32px', boxShadow: '0 0 25px rgba(255, 215, 0, 0.7)',
            border: '2px solid var(--csa-gold)', position: 'relative'
        }}>
            <img src="https://thongtin.yuichycsa.id.vn/image/logo.png" alt="Logo" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            <span className="csa-hat" style={{ position: 'absolute', top: '-12px', right: '-8px', fontSize: '28px', transform: 'rotate(15deg)' }}>🐎</span>
        </div>
        <div className="csa-title">
            <h1 className="gold-shimmer" style={{ margin: 0, fontSize: '26px', textTransform: 'uppercase', letterSpacing: '1px' }}>Kho Apple ID Tết 2026</h1>
            <p style={{ margin: '6px 0 0', fontSize: '14px', color: 'var(--csa-muted)' }}>Xuân Bính Ngọ - Mã Đáo Thành Công - CSA Group</p>
        </div>
    </header>
);

export default Header;
