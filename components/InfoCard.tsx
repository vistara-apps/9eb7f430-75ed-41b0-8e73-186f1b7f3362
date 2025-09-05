'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: LucideIcon;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export function InfoCard({ 
  title, 
  children, 
  icon: Icon, 
  variant = 'default',
  className = ''
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        ${variant === 'highlighted' 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 p-[1px] rounded-lg' 
          : ''
        }
        ${className}
      `}
    >
      <div className={`
        ${variant === 'highlighted' 
          ? 'glass-card bg-opacity-90 backdrop-blur-xl' 
          : 'glass-card'
        } 
        p-6 rounded-lg h-full
      `}>
        <div className="flex items-center space-x-3 mb-4">
          {Icon && (
            <div className={`
              p-2 rounded-lg
              ${variant === 'highlighted' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-white bg-opacity-10'
              }
            `}>
              <Icon className="w-5 h-5 text-white" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        
        <div className="text-gray-200">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
