'use client';

import { useState } from 'react';
import { Menu, X, Globe, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

interface HeaderProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (lang: 'en' | 'es') => void;
}

export function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KYR</span>
          </div>
          <span className="text-white font-semibold text-lg">KnowYourRights</span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => onLanguageChange(currentLanguage === 'en' ? 'es' : 'en')}
            className="flex items-center space-x-2 glass-card px-3 py-2 rounded-lg hover:bg-opacity-20 transition-all duration-200"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">{currentLanguage === 'en' ? 'ES' : 'EN'}</span>
          </button>

          <Wallet>
            <ConnectWallet>
              <Name />
            </ConnectWallet>
          </Wallet>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden glass-card p-2 rounded-lg"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 glass-card rounded-lg p-4 md:hidden"
          >
            <div className="space-y-4">
              <button
                onClick={() => {
                  onLanguageChange(currentLanguage === 'en' ? 'es' : 'en');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>{currentLanguage === 'en' ? 'Español' : 'English'}</span>
              </button>

              <div className="pt-2 border-t border-white border-opacity-20">
                <Wallet>
                  <ConnectWallet>
                    <Name />
                  </ConnectWallet>
                </Wallet>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
