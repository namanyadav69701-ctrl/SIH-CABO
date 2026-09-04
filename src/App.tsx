import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveMonitorPage } from './components/LiveMonitorPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { LoginPage } from './components/LoginPage';
import { SellerDashboard } from './components/dashboards/SellerDashboard';
import { BuyerDashboard } from './components/dashboards/BuyerDashboard';
import { ProfileModal } from './components/dashboards/ProfileModal';
import { SupportChatBot } from './components/SupportChatBot';
import { Footer } from './components/Footer';
import { TerminalModal } from './components/TerminalModal';
import { User, UserRole } from './types/auth';
import { authApi } from './services/authApi';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    'login' | 'monitor' | 'process' | 'seller_dashboard' | 'buyer_dashboard'
  >('login');
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessDeniedMessage, setAccessDeniedMessage] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // Initialize and verify user session from backend on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await authApi.getCurrentUser();
        if (res.success && res.user) {
          setCurrentUser(res.user);
          // If authenticated and no specific public route is in hash, route to appropriate dashboard
          const hash = window.location.hash.toLowerCase();
          if (!hash || hash === '#' || hash.startsWith('#login')) {
            if (res.user.role === 'seller') {
              setCurrentPage('seller_dashboard');
              window.location.hash = '#seller/dashboard';
            } else {
              setCurrentPage('buyer_dashboard');
              window.location.hash = '#buyer/dashboard';
            }
          }
        } else {
          setCurrentUser(null);
          // When not authenticated, default entry screen is the split-screen login page
          const hash = window.location.hash.toLowerCase();
          if (!hash.includes('monitor') && !hash.includes('process') && !hash.includes('how-it-works')) {
            setCurrentPage('login');
            if (!hash.startsWith('#login')) {
              window.location.hash = '#login';
            }
          }
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
      } finally {
        setAuthInitialized(true);
      }
    }
    checkSession();
  }, []);

  // Hash-based routing and Role-Based Route Protection
  useEffect(() => {
    if (!authInitialized) return;

    const handleHashRouting = () => {
      const hash = window.location.hash.toLowerCase();

      // Clear any prior temporary access alert
      setAccessDeniedMessage(null);

      // SELLER ROUTE PROTECTION
      if (hash.includes('seller/dashboard') || hash.includes('seller-dashboard')) {
        if (!currentUser) {
          setAccessDeniedMessage('Authentication required. Please log in to access Seller Dashboard.');
          setCurrentPage('login');
          window.location.hash = '#login/seller';
          return;
        }
        if (currentUser.role !== 'seller') {
          // BUYER ATTEMPTING TO ACCESS SELLER ROUTE -> DENY & REDIRECT
          setAccessDeniedMessage('Access Denied: Your account role is BUYER. You cannot access the Seller portal.');
          setCurrentPage('buyer_dashboard');
          window.location.hash = '#buyer/dashboard';
          return;
        }
        setCurrentPage('seller_dashboard');
        return;
      }

      // BUYER ROUTE PROTECTION
      if (hash.includes('buyer/dashboard') || hash.includes('buyer-dashboard')) {
        if (!currentUser) {
          setAccessDeniedMessage('Authentication required. Please log in to access Buyer Dashboard.');
          setCurrentPage('login');
          window.location.hash = '#login/buyer';
          return;
        }
        if (currentUser.role !== 'buyer') {
          // SELLER ATTEMPTING TO ACCESS BUYER ROUTE -> DENY & REDIRECT
          setAccessDeniedMessage('Access Denied: Your account role is SELLER. You cannot access the Buyer portal.');
          setCurrentPage('seller_dashboard');
          window.location.hash = '#seller/dashboard';
          return;
        }
        setCurrentPage('buyer_dashboard');
        return;
      }

      // PUBLIC ROUTES
      if (hash.includes('monitor') || hash.includes('metrics')) {
        setCurrentPage('monitor');
      } else if (hash.includes('process') || hash.includes('how-it-works')) {
        setCurrentPage('process');
      } else if (hash.includes('login') || hash.includes('auth')) {
        setCurrentPage('login');
      } else {
        // Default entry behavior: authenticated users land on their dashboard; logged-out users land on split-screen auth
        if (currentUser) {
          if (currentUser.role === 'seller') {
            setCurrentPage('seller_dashboard');
            window.location.hash = '#seller/dashboard';
          } else {
            setCurrentPage('buyer_dashboard');
            window.location.hash = '#buyer/dashboard';
          }
        } else {
          setCurrentPage('login');
          window.location.hash = '#login';
        }
      }
    };

    handleHashRouting();
    window.addEventListener('hashchange', handleHashRouting);
    return () => window.removeEventListener('hashchange', handleHashRouting);
  }, [authInitialized, currentUser]);

  const handleSelectPage = (
    page: 'login' | 'monitor' | 'process' | 'seller_dashboard' | 'buyer_dashboard'
  ) => {
    setCurrentPage(page);
    let newHash = '#monitor';
    if (page === 'login') newHash = '#login';
    else if (page === 'process') newHash = '#how-it-works';
    else if (page === 'seller_dashboard') newHash = '#seller/dashboard';
    else if (page === 'buyer_dashboard') newHash = '#buyer/dashboard';

    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setAccessDeniedMessage(null);

    // Redirect to the appropriate role-based dashboard
    if (user.role === 'seller') {
      setCurrentPage('seller_dashboard');
      window.location.hash = '#seller/dashboard';
    } else {
      setCurrentPage('buyer_dashboard');
      window.location.hash = '#buyer/dashboard';
    }
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setCurrentUser(null);
    setCurrentPage('login');
    window.location.hash = '#login';
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        currentPage === 'login' ? 'lg:h-screen lg:overflow-hidden' : ''
      } bg-[#F5F4EF] text-[#1F2421] selection:bg-[#2D4F36] selection:text-white font-sans`}
    >
      {/* Route Security Notification Toast */}
      {accessDeniedMessage && (
        <div className="bg-red-600 text-white px-4 py-2.5 font-mono text-xs flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-white" />
            <span className="font-bold uppercase">{accessDeniedMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setAccessDeniedMessage(null)}
            className="text-white/80 hover:text-white underline uppercase text-[10px] ml-4 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Header (Rendered across navigation pages; Login screen uses distraction-free split layout) */}
      {currentPage !== 'login' && (
        <Header
          onOpenTerminal={() => setTerminalOpen(true)}
          currentPage={currentPage}
          onSelectPage={handleSelectPage}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenProfile={() => setProfileModalOpen(true)}
        />
      )}

      {/* Main Content Viewports */}
      <main className={`flex-grow ${currentPage === 'login' ? 'lg:h-full lg:overflow-hidden' : ''}`}>
        {currentPage === 'login' && (
          <LoginPage
            currentUser={currentUser}
            onLogin={handleLoginSuccess}
            onLogout={handleLogout}
            onNavigateToMonitor={() => handleSelectPage('monitor')}
            onNavigateToProcess={() => handleSelectPage('process')}
          />
        )}

        {currentPage === 'monitor' && (
          <LiveMonitorPage
            onNavigateToProcess={() => handleSelectPage('process')}
            onNavigateToLogin={() => handleSelectPage('login')}
            onOpenTerminal={() => setTerminalOpen(true)}
          />
        )}

        {currentPage === 'process' && (
          <HowItWorksPage
            onNavigateToMonitor={() => handleSelectPage('monitor')}
            onOpenTerminal={() => setTerminalOpen(true)}
          />
        )}

        {currentPage === 'seller_dashboard' && currentUser && (
          <SellerDashboard
            user={currentUser}
            onLogout={handleLogout}
            onNavigateHome={() => handleSelectPage('monitor')}
            onOpenTerminal={() => setTerminalOpen(true)}
            onOpenProfile={() => setProfileModalOpen(true)}
          />
        )}

        {currentPage === 'buyer_dashboard' && currentUser && (
          <BuyerDashboard
            user={currentUser}
            onLogout={handleLogout}
            onNavigateHome={() => handleSelectPage('monitor')}
            onOpenTerminal={() => setTerminalOpen(true)}
          />
        )}
      </main>

      {/* Global AI Support Chatbot Wrapper */}
      <SupportChatBot />

      {/* Footer (Only rendered on main content pages) */}
      {currentPage !== 'login' && (
        <Footer onOpenTerminal={() => setTerminalOpen(true)} />
      )}

      {/* Raw Node Telemetry Packet Modal */}
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* User Profile Modal */}
      {currentUser && (
        <ProfileModal
          user={currentUser}
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
