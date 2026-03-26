import React from 'react';

function SettingsScreen({ onNavigate }) {
  return (
    <section className="app-screen active settings-screen">
      <header className="app-header">
        <div className="header-left"><img src="https://via.placeholder.com/40" alt="Avatar" className="user-avatar" /></div>
        <div className="header-center">
          <span className="balance-label">PERFIL</span>
          <span className="balance-value">Ajustes</span>
        </div>
        <div className="header-right"><button className="wallet-icon">⚙️</button></div>
      </header>

      <main className="settings-container">
        
        <div className="profile-section">
          <img src="https://via.placeholder.com/80" alt="Profile" className="profile-large-avatar" />
          <h3>Usuario Zen</h3>
          <p className="wallet-address">0x71C...9A23</p>
        </div>

        <div className="settings-list">
          <div className="settings-group">
            <h4 className="group-title">Conexión Web3 (Beexo)</h4>
            <div className="setting-item">
              <span>Red Activa</span>
              <span className="badge-rsk">RSK Testnet</span>
            </div>
            <div className="setting-item">
              <span>Smart Contract Base</span>
              <span className="text-hint">0x4B2...11F0</span>
            </div>
          </div>

          <div className="settings-group">
            <h4 className="group-title">Preferencias de IA</h4>
            <div className="setting-item">
              <span>Tono del Terapeuta</span>
              <span className="text-primary">Empático</span>
            </div>
            <div className="setting-item">
              <span>Moneda Base</span>
              <span>USD</span>
            </div>
          </div>
        </div>

        <button className="btn-logout" onClick={() => onNavigate('onboarding')}>
          Desconectar Billetera
        </button>
      </main>

      {/* Navegación Inferior */}
      <nav className="app-bottom-nav">
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('vaults'); }}><div className="dashed-circle">🏛️</div><span>Bóvedas</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('chat'); }}><div className="dashed-circle chat-icon">💬</div><span>Chat</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('stats'); }}><div className="dashed-circle">📊</div><span>Estadísticas</span></a>
        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); }}><div className="dashed-circle">⚙️</div><span>Ajustes</span></a>
      </nav>
    </section>
  );
}

export default SettingsScreen;