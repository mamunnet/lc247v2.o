import React, { useState } from 'react';
import { Headphones, X } from 'lucide-react';

const SupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const supportNumbers = [
    { id: 'Customer Support 1', number: '+3159755293' }
  ];

  return (
    <>
      {/* Sticky Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#65EDBF] hover:bg-[#50d6a8] text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
      >
        <Headphones className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Need Help?
        </span>
      </button>

      {/* Support Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-[#65EDBF]/10 backdrop-blur-sm p-6 relative">
              <div className="flex items-center justify-center space-x-3">
                <Headphones className="w-8 h-8 text-[#65EDBF]" />
                <h2 className="text-2xl font-bold text-white">সহযোগিতা </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Support Numbers */}
            <div className="p-6 space-y-4">
              {supportNumbers.map((support) => (
                <div
                  key={support.id}
                  className="bg-gray-800/50 rounded-xl p-4 flex items-center justify-between border border-gray-700/50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#FFE15D] rounded-full flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-gray-900" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{support.id}</div>
                      <div className="text-[#65EDBF]">{support.number}</div>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${support.number.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded-lg transition-colors duration-300"
                  >
                    Message
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportButton;