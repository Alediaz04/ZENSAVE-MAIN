import React from 'react';

function StatsScreen({ onNavigate }) {
  return (
    <section className="app-screen active stats-screen">
      <header className="app-header">
        <div className="header-left"><img src="https://via.placeholder.com/40" alt="Avatar" className="user-avatar" /></div>
        <div className="header-center">
          <span className="balance-label">ZEN SCORE</span>
          <span className="balance-value text-primary">850 / 1000</span>
        </div>
        <div className="header-right"><button className="wallet-icon">💳</button></div>
      </header>

      <div className="chat-title-area">
        <h2>Tu Progreso</h2>
        <p>Análisis de tu salud financiera</p>
      </div>

      <main className="stats-container">
        {/* Gráfico circular simulado del Zen Score */}
        <div className="score-widget">
          <div className="circle-chart">
            <span className="score-number">850</span>
            <span className="score-label">Nivel Maestro</span>
          </div>
        </div>

        {/* Tarjetas de métricas */}
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-icon">💰</span>
            <h4>Total Ahorrado</h4>
            <p className="metric-value">$60.00 DoC</p>
          </div>
          <div className="metric-card">
            <span className="metric-icon">🛡️</span>
            <h4>Impulsos Evitados</h4>
            <p className="metric-value">4 esta semana</p>
          </div>
          <div className="metric-card full-width">
            <span className="metric-icon">📈</span>
            <h4>Rendimiento DeFi (RSK)</h4>
            <p className="metric-value text-primary">+ 2.4% APY Estimado</p>
          </div>
        </div>
      </main>

      {/* Navegación Inferior */}
      <nav className="app-bottom-nav">
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('vaults'); }}><div className="dashed-circle">🏛️</div><span>Bóvedas</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('chat'); }}><div className="dashed-circle chat-icon">💬</div><span>Chat</span></a>
        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); }}><div className="dashed-circle">📊</div><span>Estadísticas</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}><div className="dashed-circle">⚙️</div><span>Ajustes</span></a>
      </nav>
    </section>
  );
}

export default StatsScreen;