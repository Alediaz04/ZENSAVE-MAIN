import React, { useState } from 'react';
import Onboarding from './components/Onboarding';
import ChatDashboard from './components/ChatDashboard';
import VaultScreen from './components/VaultScreen';
import StatsScreen from './components/StatsScreen'; // NUEVO
import SettingsScreen from './components/SettingsScreen'; // NUEVO
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('onboarding');

  return (
    <div className="mobile-frame">
      <div className="app-container">
        {currentView === 'onboarding' && <Onboarding onLogin={() => setCurrentView('chat')} />}
        {currentView === 'chat' && <ChatDashboard onNavigate={setCurrentView} />}
        {currentView === 'vaults' && <VaultScreen onNavigate={setCurrentView} />}
        {currentView === 'stats' && <StatsScreen onNavigate={setCurrentView} />}
        {currentView === 'settings' && <SettingsScreen onNavigate={setCurrentView} />}
      </div>
    </div>
  );
}

export default App;