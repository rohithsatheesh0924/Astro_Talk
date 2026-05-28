import React, { useState, useEffect } from "react";
import AOS from "aos";

// Layout Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Page Component Imports
import Home from "./pages/Home";
import AllAstrologers from "./pages/AllAstrologers";
import HoroscopePage from "./pages/HoroscopePage";
import AstroStorePage from "./pages/AstroStorePage"; 
import ChatPage from "./pages/ChatPage"; 
import WalletPage from "./pages/WalletPage";
import NotificationsPage from "./pages/NotificationsPage";

import "aos/dist/aos.css";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      offset: 120,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50/30 text-slate-900 overflow-x-hidden selection:bg-orange-200">
      {/* Universal Top Navigation Strip Layer */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Framework Body Screen Router Matrix Viewport */}
      <main className="pt-24 lg:pt-28 pb-12 lg:pb-16">
        {activePage === 'home' && (
          <Home setActivePage={setActivePage} />
        )}
        
        {activePage === 'all-astrologers' && (
          <AllAstrologers 
            setActivePage={setActivePage} 
            setSelectedAstrologer={setSelectedAstrologer} 
          />
        )}
        
        {activePage === 'horoscope' && (
          <HoroscopePage setActivePage={setActivePage} />
        )}
        
        {activePage === 'notifications' && (
  <NotificationsPage setActivePage={setActivePage} />
)}

        {activePage === 'chat' && (
          <ChatPage 
            setActivePage={setActivePage} 
            selectedAstrologer={selectedAstrologer} 
          />
        )}
        
        {activePage === 'store' && (
          <AstroStorePage setActivePage={setActivePage} />
        )}

        {/* FIXED: Added explicit routing node block to support the wallet view state cleanly */}
        {activePage === 'wallet' && (
          <WalletPage setActivePage={setActivePage} />
        )}
      </main>

      {/* Corporate Cohesive Footer Frame Layer */}
      <Footer />
    </div>
  );
}

export default App;