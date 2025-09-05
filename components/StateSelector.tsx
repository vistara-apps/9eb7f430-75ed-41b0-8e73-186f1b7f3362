'use client';

import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { US_STATES } from '@/lib/constants';

interface StateSelectorProps {
  selectedState: string;
  onStateChange: (state: string) => void;
  variant?: 'dropdown' | 'search';
}

export function StateSelector({ 
  selectedState, 
  onStateChange, 
  variant = 'dropdown' 
}: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = US_STATES.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (variant === 'search') {
    return (
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for your state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-card rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg max-h-60 overflow-y-auto z-50"
          >
            {filteredStates.map((state) => (
              <button
                key={state}
                onClick={() => {
                  onStateChange(state);
                  setSearchTerm('');
                }}
                className="w-full text-left px-4 py-3 hover:bg-white hover:bg-opacity-10 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{state}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 glass-card rounded-lg hover:bg-opacity-20 transition-all duration-200"
      >
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span>{selectedState || 'Select your state'}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 glass-card rounded-lg max-h-60 overflow-y-auto z-50"
          >
            {US_STATES.map((state) => (
              <button
                key={state}
                onClick={() => {
                  onStateChange(state);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-white hover:bg-opacity-10 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                  selectedState === state ? 'bg-purple-500 bg-opacity-20' : ''
                }`}
              >
                {state}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
