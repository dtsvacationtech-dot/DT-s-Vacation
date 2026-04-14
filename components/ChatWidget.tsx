"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Search Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-deep-navy text-tropical-gold w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:bg-opacity-90 hover:scale-105 transition-all outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Pop-up */}
      {isOpen && (
        <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-deep-navy px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-sm">Den is online</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className="p-4 h-64 bg-gray-50 flex flex-col justify-end">
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-sm text-gray-700 max-w-[85%] mb-4">
              Hello! Ready to start an intentionally adventurous journey? How can I help you today?
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100 flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow text-sm outline-none px-2 py-1"
            />
            <button className="text-tropical-gold hover:text-gold-hover p-2 font-bold inline-flex items-center">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
