'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating background shapes */}
      <div className="floating-shapes">
        <motion.div 
          className="floating-shape w-32 h-32 bg-purple-500 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="floating-shape w-24 h-24 bg-blue-500 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="floating-shape w-20 h-20 bg-pink-500 rounded-full"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div 
          className="floating-shape w-16 h-16 bg-indigo-500 rounded-full"
          animate={{ 
            y: [0, -15, 0],
            x: [0, -10, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main content */}
      <div className={`relative z-10 ${variant === 'glass' ? 'glass-surface' : ''}`}>
        {children}
      </div>
    </div>
  );
}
