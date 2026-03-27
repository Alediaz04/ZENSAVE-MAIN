import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import { XOConnect } from 'xo-connect';
import { VaultContext } from '../context/VaultContext';

const CONTRACT_ADDRESS = '0xCC4884c86C6D26F35ac1bA95DbE060b0BBDB7831';

const ABI = [
  "function deposit() external payable",
  "function withdraw(uint256 amount) external",
  "function getBalance(address user) external view returns (uint256)"
];

function InterventionCard({ emotionText, proposalText, monto_dca }) {
  const [status, setStatus] = useState('idle');
  const [txHash, setTxHash] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  
  // NUEVO: Estado para que el usuario pueda editar el monto
  const [customAmount, setCustomAmount] = useState(monto_dca || '0.0001');
  
  const { addVault } = useContext(VaultContext);

  const handleExecute = async () => {
    if (!customAmount || parseFloat(customAmount) <= 0) {
      setErrorMsg('Ingresa un monto válido mayor a 0');
      return;
    }

    setStatus('loading');
    setErrorMsg('');
    try {
      const client = await XOConnect.getClient();
      
      if (!client || !client.currencies || client.currencies.length === 0) {
        throw new Error("No hay sesión activa en Beexo.");
      }

      const currency = client.currencies[0];
      const iface = new ethers.Interface(ABI);
      const data = iface.encodeFunctionData("deposit");
      
      // Usamos el monto que el usuario ingresó en el input
      const valueWei = ethers.parseEther(customAmount.toString());
      const valueHex = "0x" + valueWei.toString(16);

      XOConnect.sendRequest({
        method: 'transactionSign',
        currency: currency.id,
        data: {
          from: currency.address,
          to: CONTRACT_ADDRESS,
          value: valueHex,
          data: data
        },
        onSuccess: (response) => {
          setTxHash(response);
          setStatus('success');
          addVault({
            id: Date.now(),
            title: "Reto Personalizado",
            lockedAmount: `${customAmount} RBTC`,
            rawAmount: parseFloat(customAmount),
            assetPurchased: "RBTC",
            progressPercent: 10,
            statusText: "Iniciando ahorro...",
            isActive: true
          });
        },
        onCancel: () => {
          setErrorMsg("Transacción cancelada por el usuario");
          setStatus('error');
        }
      });

    } catch (error) {
      setErrorMsg(error?.message || String(error));
      setStatus('error');
    }
  };

  return (
    <div className="intervention-card">
      <div className="intervention-header">
        <span className="icon-alert">💡</span>
        <h4>Momento de Reflexión</h4>
      </div>

      <div className="intervention-body">
        <p className="emotion-text">{emotionText}</p>
        <div className="proposal-box">
          <p>{proposalText}</p>
        </div>
      </div>

      <div className="intervention-footer">
        {status === 'idle' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* NUEVO: Input para que el usuario elija el monto a guardar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ fontSize: '14px', color: '#ccc' }}>Monto (RBTC):</label>
              <input 
                type="number" 
                step="0.0001"
                value={customAmount} 
                onChange={(e) => setCustomAmount(e.target.value)}
                style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: 'white' }}
              />
            </div>
            
            <button className="btn-execute" onClick={handleExecute}>
              Aceptar Reto y Guardar
            </button>
          </div>
        )}

        {status === 'loading' && (
          <button className="btn-execute loading" disabled>
            <span className="spinner"></span> Firmando depósito en Beexo...
          </button>
        )}

        {status === 'success' && (
          <div className="success-message">
            <span>✅</span> ¡Reto activo! Fondos depositados.
            {txHash && (
              <a 
                href={`https://explorer.testnet.rsk.co/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', fontSize: '11px', color: '#00E676', marginTop: '6px' }}
              >
                Ver transacción ↗
              </a>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="error-message">
            <span>❌</span> Error: {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterventionCard;