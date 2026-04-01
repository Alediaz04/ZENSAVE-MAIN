import React, { useState, useEffect } from 'react';

function MarketScreen({ onNavigate }) {
  const [prices, setPrices] = useState({
    rbtc: { price: 0, change: 0 },
    doc: { price: 1.00, change: 0 },
    rif: { price: 0, change: 0 },
  });
  const [loading, setLoading] = useState(true);
 /*Consumo de API de Binance*/
  const fetchBinancePrices = async () => {
    try {
      const [btcResponse, rifResponse] = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
        fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=RIFUSDT')
      ]);

      const btcData = await btcResponse.json();
      const rifData = await rifResponse.json();

      setPrices({
        rbtc: { 
            price: parseFloat(btcData.lastPrice), 
            change: parseFloat(btcData.priceChangePercent) 
        },
        doc: { 
            price: 1.00, 
            change: 0.0 
        },
        
        rif: { 
            price: parseFloat(rifData.lastPrice), 
            change: parseFloat(rifData.priceChangePercent) 
        }
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error conectando con Binance:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBinancePrices();
    
    const interval = setInterval(fetchBinancePrices, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val) => {
      if (!val) return "$0.00";
      return val < 1 ? `$${val.toFixed(4)}` : `$${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  const formatChange = (val) => {
    if (val === undefined || val === null) return null;
    const isPositive = val >= 0;
    return (
        <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} font-bold text-sm`}>
            {isPositive ? '+' : ''}{val.toFixed(2)}%
        </span>
    );
  };

  return (
    <section className="app-screen active stats-container" style={{ paddingBottom: '100px' }}>
      <div style={{ marginBottom: '20px', paddingTop: '10px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '8px' }}>Mercado del<br/>Santuario</h2>
        <p style={{ color: 'var(--text-hint)', fontSize: '14px', lineHeight: '1.5' }}>Valores en tiempo real de activos clave en Rootstock y el ecosistema cripto.</p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}><div className="spinner"></div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div className="market-card">
            <div className="market-card-left"><div className="coin-icon" style={{ backgroundColor: 'rgba(0, 230, 118, 0.1)', color: 'var(--primary)' }}>₿</div><div className="coin-info"><h3>Smart Bitcoin</h3><span>RBTC</span></div></div>
            <div className="market-card-right"><div className="coin-price">{formatCurrency(prices.rbtc.price)}</div>{formatChange(prices.rbtc.change)}</div>
          </div>
          
          <div className="market-card">
            <div className="market-card-left"><div className="coin-icon" style={{ backgroundColor: 'rgba(136, 136, 136, 0.1)', color: '#CCC' }}>$</div><div className="coin-info"><h3>Dollar on Chain</h3><span>DOC</span></div></div>
            <div className="market-card-right"><div className="coin-price">{formatCurrency(prices.doc.price)}</div><span className="text-gray-500 font-bold text-sm">0.0%</span></div>
          </div>
          
          <div className="market-card">
            <div className="market-card-left"><div className="coin-icon" style={{ backgroundColor: 'rgba(0, 255, 135, 0.1)', color: '#00FF87' }}>⬡</div><div className="coin-info"><h3>Rootstock Infra</h3><span>RIF</span></div></div>
            <div className="market-card-right"><div className="coin-price">{formatCurrency(prices.rif.price)}</div>{formatChange(prices.rif.change)}</div>
          </div>

        </div>
      )}
      
      <div style={{ marginTop: '20px', backgroundColor: 'rgba(136, 136, 136, 0.1)', borderRadius: '16px', padding: '20px', border: '1px solid #333' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>i</span>
              <h4 style={{ fontSize: '14px', margin: 0 }}>Santuario Insight</h4>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-hint)', lineHeight: '1.5' }}>La red Rootstock mantiene una estabilidad del 99.9% este mes. Tus activos en Smart Bitcoin (RBTC) están protegidos por el hashpower de Bitcoin.</p>
      </div>

      <nav className="app-bottom-nav">
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('vaults'); }}><div className="dashed-circle">🏛️</div><span>Bóvedas</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('chat'); }}><div className="dashed-circle chat-icon">💬</div><span>Chat</span></a>
        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); }}><div className="dashed-circle">📈</div><span>Mercado</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}><div className="dashed-circle">⚙️</div><span>Ajustes</span></a>
      </nav>
    </section>
  );
}

export default MarketScreen;