import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { XOConnect } from 'xo-connect';
import { VaultContext } from '../context/VaultContext';

const CONTRACT_ADDRESS = '0xCC4884c86C6D26F35ac1bA95DbE060b0BBDB7831';

const ABI = [
  "function withdraw(uint256 amount) external"
];

function VaultScreen({ onNavigate }) {
  // Ahora traemos removeVault del contexto
  const { vaults, removeVault } = useContext(VaultContext);
  const [withdrawingId, setWithdrawingId] = useState(null);

  const totalProtegido = vaults
    .filter(v => v.isActive && v.rawAmount)
    .reduce((total, current) => total + current.rawAmount, 0);

  // NUEVO: Función para retirar los fondos del contrato inteligente
  const handleWithdraw = async (vault) => {
    setWithdrawingId(vault.id);
    try {
      const client = await XOConnect.getClient();
      
      if (!client || !client.currencies || client.currencies.length === 0) {
        throw new Error("No hay sesión activa en Beexo.");
      }

      const currency = client.currencies[0];
      const iface = new ethers.Interface(ABI);
      
      // Convertimos el monto de la bóveda a Wei para que el contrato lo entienda
      const amountWei = ethers.parseEther(vault.rawAmount.toString());
      const data = iface.encodeFunctionData("withdraw", [amountWei]);

      XOConnect.sendRequest({
        method: 'transactionSign',
        currency: currency.id,
        data: {
          from: currency.address,
          to: CONTRACT_ADDRESS,
          value: "0x0", // Al retirar, no enviamos RBTC de nuestra wallet, así que es 0
          data: data
        },
        onSuccess: (response) => {
          console.log("Retiro exitoso TX:", response);
          // Eliminamos la bóveda de la pantalla porque el dinero ya regresó a la wallet
          removeVault(vault.id);
          setWithdrawingId(null);
        },
        onCancel: () => {
          console.log("Retiro cancelado por el usuario");
          setWithdrawingId(null);
        }
      });
    } catch (error) {
      console.error("Error al retirar:", error);
      alert("Hubo un error al retirar: " + error.message);
      setWithdrawingId(null);
    }
  };

  return (
    <section className="app-screen active vault-screen">
      <header className="app-header">
        <div className="header-left">
          <img src="https://via.placeholder.com/40" alt="Avatar" className="user-avatar" />
        </div>
        <div className="header-center">
          <span className="balance-label">TOTAL PROTEGIDO</span>
          <span className="balance-value">
            {totalProtegido > 0 ? `${totalProtegido.toFixed(4)} RBTC` : '0.0000 RBTC'}
          </span>
        </div>
        <div className="header-right">
          <button className="wallet-icon">💳</button>
        </div>
      </header>

      <div className="chat-title-area">
        <h2>Tus Bóvedas</h2>
        <p>Ahorros automatizados en Rootstock</p>
      </div>

      <main className="vault-container">
        {vaults.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 20px', color: '#888' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🏛️</span>
            <p>Aún no tienes bóvedas activas.</p>
          </div>
        ) : (
          vaults.map((vault) => (
            <div key={vault.id} className="vault-card">
              <div className="vault-card-header">
                <h3>{vault.title}</h3>
                <span className="status-badge active">Activo</span>
              </div>
              
              <div className="vault-details">
                <div className="detail-item">
                  <span className="label">Bloqueado</span>
                  <span className="value">{vault.lockedAmount}</span>
                </div>
              </div>

              {/* NUEVO: Botón para retirar fondos */}
              <div style={{ marginTop: '15px' }}>
                <button 
                  onClick={() => handleWithdraw(vault)}
                  disabled={withdrawingId === vault.id}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: withdrawingId === vault.id ? '#555' : '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: withdrawingId === vault.id ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {withdrawingId === vault.id ? 'Firmando Retiro...' : 'Romper Bóveda (Retirar)'}
                </button>
              </div>
            </div>
          ))
        )}
      </main>

      <nav className="app-bottom-nav">
        <a href="#" className="nav-item active" onClick={(e) => { e.preventDefault(); }}><div className="dashed-circle">🏛️</div><span>Bóvedas</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('chat'); }}><div className="dashed-circle chat-icon">💬</div><span>Chat</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('stats'); }}><div className="dashed-circle">📊</div><span>Estadísticas</span></a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); onNavigate('settings'); }}><div className="dashed-circle">⚙️</div><span>Ajustes</span></a>
      </nav>
    </section>
  );
}

export default VaultScreen;