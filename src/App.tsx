import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveMonitorPage } from './components/LiveMonitorPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { MadhyaPradeshPage } from './components/MadhyaPradeshPage';
import { LoginPage } from './components/LoginPage';
import { SupportChatBot } from './components/SupportChatBot';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { DEMO_PROFILES, UserProfile } from './types/auth';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'monitor' | 'process' | 'network' | 'login'>('monitor');
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_PROFILES.rajesh_host);

  // Sync with URL hash if provided
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('login') || hash.includes('auth') || hash.includes('signin')) {
        setCurrentPage('login');
      } else if (hash.includes('process') || hash.includes('how-it-works')) {
        setCurrentPage('process');
      } else if (hash.includes('network') || hash.includes('portal') || hash.includes('madhya') || hash.includes('mp')) {
        setCurrentPage('network');
      } else if (hash.includes('monitor') || hash.includes('metrics')) {
        setCurrentPage('monitor');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectPage = (page: 'monitor' | 'process' | 'network' | 'login') => {
    setCurrentPage(page);
    window.location.hash =
      page === 'login'
        ? '#login'
        : page === 'process'
        ? '#how-it-works'
        : page === 'network'
        ? '#mp-network'
        : '#monitor';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (profile: UserProfile) => {
    setCurrentUser(profile);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleOpenTerminal = () => {
    setTerminalOpen(true);
  };

  const handleCloseTerminal = () => {
    setTerminalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2ED] text-[#1F2421] selection:bg-[#2D4F36] selection:text-white font-sans">
      {/* Top Sticky Navigation with Multi-Page Switcher */}
      <Header
        onOpenTerminal={handleOpenTerminal}
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        currentUser={currentUser}
      />

      {/* Main Content Viewports */}
      <main className="flex-grow">
        {currentPage === 'monitor' && (
          /* PAGE 1: PURE LIVE MONITOR & METRICS (WITH EMBEDDED WEEKLY AUDIT & GATEWAY COMMISSION) */
          <LiveMonitorPage
            onNavigateToProcess={() => handleSelectPage('process')}
            onNavigateToNetwork={() => handleSelectPage('network')}
            onNavigateToLogin={() => handleSelectPage('login')}
            onOpenTerminal={handleOpenTerminal}
          />
        )}

        {currentPage === 'process' && (
          /* PAGE 2: HOW IT WORKS (COMPLETE END-TO-END PROCESS EXPLAINER) */
          <HowItWorksPage
            onNavigateToMonitor={() => handleSelectPage('monitor')}
            onNavigateToNetwork={() => handleSelectPage('network')}
            onOpenTerminal={handleOpenTerminal}
          />
        )}

        {currentPage === 'network' && (
          /* PAGE 3: MADHYA PRADESH PILOT NETWORK & PARTICIPANT PORTAL */
          <MadhyaPradeshPage
            onNavigateToMonitor={() => handleSelectPage('monitor')}
            onNavigateToProcess={() => handleSelectPage('process')}
            onOpenTerminal={handleOpenTerminal}
          />
        )}

        {currentPage === 'login' && (
          /* PAGE 4: GATEWAY LOGIN & AUTHENTICATION */
          <LoginPage
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onNavigateToMonitor={() => handleSelectPage('monitor')}
            onNavigateToProcess={() => handleSelectPage('process')}
          />
        )}
      </main>

      {/* Global AI Support Chatbot Wrapper at Bottom Right */}
      <SupportChatBot />

      {/* Footer */}
      <Footer onOpenTerminal={handleOpenTerminal} />

      {/* Raw Node Telemetry Packet Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={handleCloseTerminal} />
    </div>
  );
}
