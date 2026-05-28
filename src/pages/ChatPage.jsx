import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, ShieldCheck, Search, Info, ArrowLeft } from 'lucide-react';

const INITIAL_INBOX_CHATS = [
  { id: 1, name: 'Roshni Noom', expertise: 'Vedic, Kundli Specialist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', status: 'Online', lastMessage: 'Please share your complete birth coordinates.', time: 'Just Now', unread: true },
  { id: 2, name: 'Ratna Ramn', expertise: 'Tarot Card, Numerology', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', status: 'Online', lastMessage: 'The card readings indicate clear commercial shifts.', time: '2h ago', unread: false },
  { id: 3, name: 'Alok Shastri', expertise: 'KP System, Vastu Expert', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', status: 'Busy', lastMessage: 'Remedial configurations have been processed.', time: 'Yesterday', unread: false },
];

export default function ChatPage({ setActivePage, selectedAstrologer }) {
  const [activeChat, setActiveChat] = useState(selectedAstrologer || INITIAL_INBOX_CHATS[0]);
  const [showMobileList, setShowMobileList] = useState(true); // Toggle for mobile responsive view
  const [chatHistories, setChatHistories] = useState({
    1: [{ id: 101, sender: 'astro', text: 'Pranam. Please share your birth details.' }],
    2: [{ id: 201, sender: 'astro', text: 'Welcome back.' }],
    3: [{ id: 301, sender: 'astro', text: 'Namaste.' }]
  });
  
  const [inputValue, setInputValue] = useState('');
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistories, activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setChatHistories(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), { id: Date.now(), sender: 'user', text: inputValue }]
    }));
    setInputValue('');
  };

  return (
    <div className="bg-white text-slate-900 h-[85vh] flex max-w-7xl mx-auto border border-amber-200 rounded-3xl overflow-hidden shadow-2xl mt-4 relative">
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>

      {/* LEFT PANEL: Always visible on Desktop, togglable on Mobile */}
      <div className={`${showMobileList ? 'flex' : 'hidden'} md:flex w-full md:w-80 border-r border-amber-100 flex-col bg-[#FCFAF6] h-full`}>
        <div className="p-5 border-b border-amber-100">
          <h2 className="text-sm font-black text-slate-950 uppercase tracking-widest mb-4">Messages</h2>
          <div className="bg-white border border-amber-200 p-2.5 rounded-xl shadow-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input placeholder="Search..." className="bg-transparent text-xs w-full outline-none font-bold" />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto no-scrollbar">
          {INITIAL_INBOX_CHATS.map((chat) => (
            <div 
              key={chat.id} 
              onClick={() => { setActiveChat(chat); setShowMobileList(false); }}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-amber-50/50 ${activeChat.id === chat.id ? 'bg-amber-100/50' : ''}`}
            >
              <img src={chat.image} className="w-12 h-12 rounded-full border-2 border-amber-200" />
              <div className="overflow-hidden">
                <h4 className="text-xs font-black truncate">{chat.name}</h4>
                <p className="text-[10px] text-slate-500 truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL: Active Chat Thread */}
      <div className={`${showMobileList ? 'hidden' : 'flex'} md:flex flex-col flex-grow h-full bg-white`}>
        {/* Mobile Header Bar */}
        <div className="p-4 border-b border-amber-100 flex items-center gap-3">
          <button className="md:hidden p-2" onClick={() => setShowMobileList(true)}><ArrowLeft className="w-5 h-5" /></button>
          <img src={activeChat.image} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <h3 className="text-xs font-black">{activeChat.name}</h3>
            <span className="text-[9px] text-emerald-500 font-bold uppercase">{activeChat.status}</span>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-[#FCFAF6]/20 no-scrollbar">
          {(chatHistories[activeChat.id] || []).map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-xs font-semibold max-w-[80%] ${msg.sender === 'user' ? 'bg-orange-500 text-white rounded-tr-none' : 'bg-white border border-amber-100 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input Tray */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-amber-100 flex gap-2">
          <input 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-amber-50/50 p-3 rounded-xl text-xs font-bold outline-none border border-amber-200"
            placeholder="Type your message..."
          />
          <button type="submit" className="p-3 bg-orange-500 text-white rounded-xl"><Send className="w-4 h-4" /></button>
        </form>
      </div>
    </div>
  );
}