import React, { createContext, useState } from 'react';

export const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const [vaults, setVaults] = useState([]);

  const addVault = (newVault) => {
    setVaults((prevVaults) => [newVault, ...prevVaults]);
  };

  // NUEVO: Función para remover la bóveda cuando se retiran los fondos
  const removeVault = (id) => {
    setVaults((prevVaults) => prevVaults.filter(vault => vault.id !== id));
  };

  return (
    <VaultContext.Provider value={{ vaults, addVault, removeVault }}>
      {children}
    </VaultContext.Provider>
  );
};