import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send, Sparkles, CheckCheck } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { addToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleSend = (presetText?: string) => {
    const textToSend = presetText || chatMessage || 'Hello! I am interested in viewing your luxury properties.';
    const encodedText = encodeURIComponent(textToSend);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=18005550190&text=${encodedText}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    addToast('Connecting to WhatsApp Concierge', 'Opening WhatsApp chat with our luxury agent.', 'info');
    setChatMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Interactive Chat Bubble Popover */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up flex flex-col">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                  alt="Apex Concierge"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">Apex Luxury Concierge</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                  Online • Typically replies in minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-emerald-700/60 hover:bg-emerald-700 flex items-center justify-center text-white transition"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-5 bg-gray-50 flex-1 space-y-3">
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-xs text-gray-800 leading-relaxed max-w-[85%]">
              <p className="font-semibold text-gray-900 mb-1">Welcome to Apex PDS Solutions! 👋</p>
              How can we assist your luxury property acquisition or listing today?
              <span className="block text-[10px] text-gray-400 mt-1.5 flex items-center justify-end gap-1">
                Just now <CheckCheck className="w-3 h-3 text-emerald-500" />
              </span>
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quick Inquiries:</p>
              {[
                '📅 Schedule a private property viewing',
                '💎 Request off-market portfolio access',
                '🏡 Sell or value my residence',
                '🤝 Speak directly with a Senior Broker'
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip)}
                  className="w-full text-left text-xs bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200 p-2.5 rounded-xl transition text-gray-700 font-medium shadow-2xs"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-emerald-600 transition"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition shrink-0 shadow-md shadow-emerald-500/20"
              title="Send via WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 relative group"
        aria-label="Open WhatsApp Chat"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />

        {/* Hover Tooltip */}
        {!isOpen && (
          <span className="absolute right-16 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow-lg pointer-events-none">
            Chat on WhatsApp
          </span>
        )}
      </button>
    </div>
  );
};
