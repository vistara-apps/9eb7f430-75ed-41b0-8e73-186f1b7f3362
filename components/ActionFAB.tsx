'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  Video, 
  Square, 
  Share2, 
  Menu as MenuIcon,
  FileText,
  MessageSquare
} from 'lucide-react';
import { RecordingState } from '@/lib/types';

interface ActionFABProps {
  variant: 'recording' | 'share' | 'menu';
  recordingState?: RecordingState;
  onStartRecording?: (type: 'audio' | 'video') => void;
  onStopRecording?: () => void;
  onShare?: () => void;
  onGenerateScript?: () => void;
  onViewGuide?: () => void;
}

export function ActionFAB({
  variant,
  recordingState,
  onStartRecording,
  onStopRecording,
  onShare,
  onGenerateScript,
  onViewGuide
}: ActionFABProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (variant === 'recording') {
    const isRecording = recordingState?.isRecording || false;

    return (
      <div className="fixed bottom-6 right-6 z-50">
        {!isRecording ? (
          <div className="flex flex-col space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStartRecording?.('video')}
              className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Video className="w-6 h-6 text-white" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStartRecording?.('audio')}
              className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Mic className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStopRecording}
            className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg recording-pulse relative"
          >
            <Square className="w-8 h-8 text-white" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </div>
    );
  }

  if (variant === 'share') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShare}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      >
        <Share2 className="w-6 h-6 text-white" />
      </motion.button>
    );
  }

  if (variant === 'menu') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 right-0 flex flex-col space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onGenerateScript?.();
                  setIsMenuOpen(false);
                }}
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <MessageSquare className="w-5 h-5 text-white" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onViewGuide?.();
                  setIsMenuOpen(false);
                }}
                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <FileText className="w-5 h-5 text-white" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MenuIcon className="w-6 h-6 text-white" />
          </motion.div>
        </motion.button>
      </div>
    );
  }

  return null;
}
