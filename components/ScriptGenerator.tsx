'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Loader2, Copy, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { generateScript } from '@/lib/ai-service';
import { GeneratedScript, ScriptRequest } from '@/lib/types';
import { COMMON_SCENARIOS } from '@/lib/constants';

interface ScriptGeneratorProps {
  state: string;
  language: 'en' | 'es';
  onScriptGenerated?: (script: GeneratedScript) => void;
}

export function ScriptGenerator({ state, language, onScriptGenerated }: ScriptGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<GeneratedScript | null>(null);
  const [selectedScenario, setSelectedScenario] = useState('');
  const [customScenario, setCustomScenario] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateScript = async () => {
    const scenario = selectedScenario === 'custom' ? customScenario : selectedScenario;
    
    if (!scenario.trim()) return;

    setIsGenerating(true);
    
    try {
      const request: ScriptRequest = {
        scenario,
        state,
        language,
      };

      const script = await generateScript(request);
      setGeneratedScript(script);
      onScriptGenerated?.(script);
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyScript = async () => {
    if (!generatedScript) return;
    
    const content = `${generatedScript.script}\n\nDO SAY:\n${generatedScript.doSay.join('\n')}\n\nDON'T SAY:\n${generatedScript.dontSay.join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          {language === 'en' ? 'Script Generator' : 'Generador de Guiones'}
        </h2>
        <p className="text-gray-300">
          {language === 'en' 
            ? 'Get personalized scripts for different encounter scenarios'
            : 'Obtenga guiones personalizados para diferentes escenarios de encuentros'
          }
        </p>
      </motion.div>

      {/* Scenario Selection */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          {language === 'en' ? 'Select Scenario' : 'Seleccionar Escenario'}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {COMMON_SCENARIOS.map((scenario) => (
            <button
              key={scenario}
              onClick={() => setSelectedScenario(scenario)}
              className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedScenario === scenario
                  ? 'bg-purple-500 text-white'
                  : 'glass-surface hover:bg-opacity-20 text-gray-300'
              }`}
            >
              {scenario}
            </button>
          ))}
          <button
            onClick={() => setSelectedScenario('custom')}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedScenario === 'custom'
                ? 'bg-purple-500 text-white'
                : 'glass-surface hover:bg-opacity-20 text-gray-300'
            }`}
          >
            {language === 'en' ? 'Custom' : 'Personalizado'}
          </button>
        </div>

        {selectedScenario === 'custom' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4"
          >
            <textarea
              value={customScenario}
              onChange={(e) => setCustomScenario(e.target.value)}
              placeholder={language === 'en' 
                ? 'Describe your specific scenario...'
                : 'Describa su escenario específico...'
              }
              className="w-full p-3 glass-surface rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </motion.div>
        )}

        <button
          onClick={handleGenerateScript}
          disabled={isGenerating || (!selectedScenario || (selectedScenario === 'custom' && !customScenario.trim()))}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{language === 'en' ? 'Generating...' : 'Generando...'}</span>
            </>
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'en' ? 'Generate Script' : 'Generar Guión'}</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Script */}
      {generatedScript && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Main Script */}
          <div className="glass-card p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {language === 'en' ? 'Your Script' : 'Su Guión'}
              </h3>
              <button
                onClick={handleCopyScript}
                className="flex items-center space-x-2 glass-surface px-3 py-2 rounded-lg hover:bg-opacity-20 transition-all duration-200"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="text-sm">
                  {copied 
                    ? (language === 'en' ? 'Copied!' : '¡Copiado!') 
                    : (language === 'en' ? 'Copy' : 'Copiar')
                  }
                </span>
              </button>
            </div>
            
            <p className="text-gray-200 leading-relaxed">{generatedScript.script}</p>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-white">
                  {language === 'en' ? 'DO Say' : 'SÍ Decir'}
                </h4>
              </div>
              <ul className="space-y-2">
                {generatedScript.doSay.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <XCircle className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold text-white">
                  {language === 'en' ? 'DON\'T Say' : 'NO Decir'}
                </h4>
              </div>
              <ul className="space-y-2">
                {generatedScript.dontSay.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional Tips */}
          {generatedScript.additionalTips.length > 0 && (
            <div className="glass-card p-6 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <h4 className="font-semibold text-white">
                  {language === 'en' ? 'Additional Tips' : 'Consejos Adicionales'}
                </h4>
              </div>
              <ul className="space-y-2">
                {generatedScript.additionalTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-200">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
