import React, { FC } from 'react';

const Header: FC = () => (
    <header className="app-header" style={{
        display: 'flex', alignItems: 'center', gap: '20px',
        marginBottom: '40px', paddingBottom: '20px',
        borderBottom: '1px solid var(--glass-border)',
        position: 'relative', marginTop: '30px'
    }}>
        <div className="app-logo" style={{
            width: '70px', height: '70px',
            background: 'var(--gold-gradient)',
            borderRadius: '50%', display: 'grid', placeItems: 'center',
            padding: '2px', position: 'relative', overflow: 'hidden',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
        }}>
            <img src="https://i.ibb.co/Y7d5zS6k/IMG-8541.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', border: '2px solid var(--bg-base)' }} />
        </div>
        <div className="app-title">
            <h1 className="serif-title gold-text" style={{ margin: 0, fontSize: '32px', letterSpacing: '1px' }}>Locket Gold</h1>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500 }}>Premium Access</p>
        </div>
    </header>
);

export default Header;