'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { Header } from '@/components/Header';
import { StateSelector } from '@/components/StateSelector';
import { RightsGuide } from '@/components/RightsGuide';
import { ScriptGenerator } from '@/components/ScriptGenerator';
import { RecordingInterface } from '@/components/RecordingInterface';
import { ActionFAB } from '@/components/ActionFAB';
import { InfoCard } from '@/components/InfoCard';
import { Shield, MessageSquare, Mic, Share2, FileText, Users } from 'lucide-react';
import { requestLocationPermission } from '@/lib/utils';
import { RecordingState, EncounterRecord, GeneratedScript } from '@/lib/types';

type ViewMode = 'home' | 'guide' | 'script' | 'record';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedState, setSelectedState] = useState('California');
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    recordingType: null,
    duration: 0
  });
  const [savedRecordings, setSavedRecordings] = useState<EncounterRecord[]>([]);
  const [generatedScripts, setGeneratedScripts] = useState<GeneratedScript[]>([]);

  useEffect(() => {
    setFrameReady();
    
    // Try to get user's location for state detection
    const detectLocation = async () => {
      const position = await requestLocationPermission();
      if (position) {
        // In a real app, you'd use a geocoding service to convert coordinates to state
        console.log('User location detected:', position.coords);
      }
    };
    
    detectLocation();
  }, [setFrameReady]);

  const handleStartRecording = (type: 'audio' | 'video') => {
    setRecordingState({
      isRecording: true,
      recordingType: type,
      duration: 0
    });
    setCurrentView('record');
  };

  const handleStopRecording = () => {
    setRecordingState({
      isRecording: false,
      recordingType: null,
      duration: 0
    });
  };

  const handleRecordingComplete = (record: EncounterRecord) => {
    setSavedRecordings(prev => [...prev, record]);
  };

  const handleScriptGenerated = (script: GeneratedScript) => {
    setGeneratedScripts(prev => [...prev, script]);
  };

  const handleShare = () => {
    const content = `Know Your Rights in ${selectedState}\n\nStay informed and stay safe with KnowYourRights Cards.\n\n${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'KnowYourRights Cards',
        text: content,
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(content).then(() => {
        alert(currentLanguage === 'en' 
          ? 'Content copied to clipboard!'
          : '¡Contenido copiado al portapapeles!'
        );
      });
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'guide':
        return <RightsGuide state={selectedState} language={currentLanguage} />;
      case 'script':
        return (
          <ScriptGenerator 
            state={selectedState} 
            language={currentLanguage}
            onScriptGenerated={handleScriptGenerated}
          />
        );
      case 'record':
        return (
          <RecordingInterface 
            onRecordingComplete={handleRecordingComplete}
            language={currentLanguage}
          />
        );
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  KnowYourRights
                  <span className="block text-gradient">Cards</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentLanguage === 'en' 
                    ? 'Your Pocket Guide to Rights in Stressful Encounters'
                    : 'Su Guía de Bolsillo para Derechos en Encuentros Estresantes'
                  }
                </motion.p>
              </div>

              <motion.button
                onClick={() => setCurrentView('record')}
                className="btn-primary text-lg px-8 py-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentLanguage === 'en' ? 'Start Recording' : 'Comenzar Grabación'}
              </motion.button>
            </motion.div>

            {/* State Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-md mx-auto"
            >
              <StateSelector
                selectedState={selectedState}
                onStateChange={setSelectedState}
                variant="search"
              />
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <InfoCard
                title={currentLanguage === 'en' ? 'State-Specific Rights' : 'Derechos Específicos del Estado'}
                icon={Shield}
                variant="highlighted"
              >
                <p className="text-sm mb-4">
                  {currentLanguage === 'en' 
                    ? 'Get accurate, location-based information on your legal rights and communication strategies.'
                    : 'Obtenga información precisa y basada en la ubicación sobre sus derechos legales y estrategias de comunicación.'
                  }
                </p>
                <button
                  onClick={() => setCurrentView('guide')}
                  className="btn-secondary text-sm w-full"
                >
                  {currentLanguage === 'en' ? 'View Rights Guide' : 'Ver Guía de Derechos'}
                </button>
              </InfoCard>

              <InfoCard
                title={currentLanguage === 'en' ? 'AI Script Generator' : 'Generador de Guiones IA'}
                icon={MessageSquare}
              >
                <p className="text-sm mb-4">
                  {currentLanguage === 'en' 
                    ? 'Generate personalized scripts for different encounter scenarios using AI.'
                    : 'Genere guiones personalizados para diferentes escenarios de encuentros usando IA.'
                  }
                </p>
                <button
                  onClick={() => setCurrentView('script')}
                  className="btn-secondary text-sm w-full"
                >
                  {currentLanguage === 'en' ? 'Generate Script' : 'Generar Guión'}
                </button>
              </InfoCard>

              <InfoCard
                title={currentLanguage === 'en' ? 'Quick Documentation' : 'Documentación Rápida'}
                icon={Mic}
              >
                <p className="text-sm mb-4">
                  {currentLanguage === 'en' 
                    ? 'Instantly record audio or video of encounters for evidence and accountability.'
                    : 'Grabe instantáneamente audio o video de encuentros para evidencia y responsabilidad.'
                  }
                </p>
                <button
                  onClick={() => setCurrentView('record')}
                  className="btn-secondary text-sm w-full"
                >
                  {currentLanguage === 'en' ? 'Start Recording' : 'Comenzar Grabación'}
                </button>
              </InfoCard>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">50</div>
                <div className="text-sm text-gray-300">
                  {currentLanguage === 'en' ? 'States Covered' : 'Estados Cubiertos'}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{generatedScripts.length}</div>
                <div className="text-sm text-gray-300">
                  {currentLanguage === 'en' ? 'Scripts Generated' : 'Guiones Generados'}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">{savedRecordings.length}</div>
                <div className="text-sm text-gray-300">
                  {currentLanguage === 'en' ? 'Recordings Saved' : 'Grabaciones Guardadas'}
                </div>
              </div>
              
              <div className="glass-card p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-sm text-gray-300">
                  {currentLanguage === 'en' ? 'Languages' : 'Idiomas'}
                </div>
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <AppShell>
      <Header 
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />
      
      <main className="container mx-auto px-4 pb-24">
        {/* Back Navigation */}
        {currentView !== 'home' && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setCurrentView('home')}
            className="mb-6 flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            <span>←</span>
            <span>{currentLanguage === 'en' ? 'Back to Home' : 'Volver al Inicio'}</span>
          </motion.button>
        )}

        {renderContent()}
      </main>

      {/* Floating Action Buttons */}
      {currentView === 'home' && (
        <ActionFAB
          variant="menu"
          onGenerateScript={() => setCurrentView('script')}
          onViewGuide={() => setCurrentView('guide')}
        />
      )}

      {currentView === 'record' && (
        <ActionFAB
          variant="recording"
          recordingState={recordingState}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      )}

      {(currentView === 'guide' || currentView === 'script') && (
        <ActionFAB
          variant="share"
          onShare={handleShare}
        />
      )}
    </AppShell>
  );
}
