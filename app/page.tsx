'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // Frame ready logic can be added later when MiniKit is properly configured
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          KnowYourRights Cards
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Your Pocket Guide to Rights in Stressful Encounters
        </p>
        
        <div className="glass-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="space-y-4">
            <button className="btn-primary w-full">
              View Rights Guide
            </button>
            <button className="btn-secondary w-full">
              Generate Script
            </button>
            <button className="btn-outline w-full">
              Start Recording
            </button>
          </div>
        </div>
        
        <div className="glass-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                🛡️
              </div>
              <p className="text-sm">State-Specific Rights</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                💬
              </div>
              <p className="text-sm">Script Generator</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                🎤
              </div>
              <p className="text-sm">Quick Record</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                📤
              </div>
              <p className="text-sm">Share Cards</p>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-400">
          <p>Built with Next.js + OnchainKit</p>
          <p>Powered by Base Network</p>
        </div>
      </div>
    </div>
  );
}
