'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Phone, CheckCircle, XCircle } from 'lucide-react';
import { InfoCard } from './InfoCard';
import { BASIC_RIGHTS, EMERGENCY_CONTACTS } from '@/lib/constants';

interface RightsGuideProps {
  state: string;
  language: 'en' | 'es';
}

export function RightsGuide({ state, language }: RightsGuideProps) {
  const rights = BASIC_RIGHTS[language];
  const contacts = EMERGENCY_CONTACTS[language];

  const stateSpecificGuidance = {
    en: {
      title: `Your Rights in ${state}`,
      dosList: [
        'Stay calm and keep your hands visible',
        'Clearly state "I am exercising my right to remain silent"',
        'Ask "Am I free to leave?" if not under arrest',
        'Record the interaction if legally permitted',
        'Remember badge numbers and patrol car numbers'
      ],
      dontsList: [
        'Don\'t physically resist, even if you believe the stop is unfair',
        'Don\'t argue, complain, or bad-mouth the officer',
        'Don\'t lie or provide false information',
        'Don\'t consent to searches without a warrant',
        'Don\'t make sudden movements'
      ]
    },
    es: {
      title: `Sus Derechos en ${state}`,
      dosList: [
        'Manténgase calmado y mantenga las manos visibles',
        'Declare claramente "Estoy ejerciendo mi derecho a permanecer en silencio"',
        'Pregunte "¿Soy libre de irme?" si no está arrestado',
        'Grabe la interacción si es legalmente permitido',
        'Recuerde números de placa y números de patrulla'
      ],
      dontsList: [
        'No resista físicamente, incluso si cree que la parada es injusta',
        'No discuta, se queje o hable mal del oficial',
        'No mienta o proporcione información falsa',
        'No consienta a registros sin una orden',
        'No haga movimientos repentinos'
      ]
    }
  };

  const guidance = stateSpecificGuidance[language];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">{guidance.title}</h1>
        <p className="text-gray-300">
          {language === 'en' 
            ? 'Know your rights and stay safe during police encounters'
            : 'Conozca sus derechos y manténgase seguro durante encuentros policiales'
          }
        </p>
      </motion.div>

      {/* Basic Rights */}
      <InfoCard
        title={rights.title}
        icon={Shield}
        variant="highlighted"
      >
        <ul className="space-y-2">
          {rights.rights.map((right, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-2"
            >
              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{right}</span>
            </motion.li>
          ))}
        </ul>
      </InfoCard>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-6">
        <InfoCard
          title={language === 'en' ? 'What TO Do' : 'Qué HACER'}
          icon={CheckCircle}
        >
          <ul className="space-y-2">
            {guidance.dosList.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2"
              >
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard
          title={language === 'en' ? 'What NOT to Do' : 'Qué NO Hacer'}
          icon={XCircle}
        >
          <ul className="space-y-2">
            {guidance.dontsList.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-2"
              >
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </InfoCard>
      </div>

      {/* Emergency Contacts */}
      <InfoCard
        title={contacts.title}
        icon={Phone}
      >
        <div className="space-y-3">
          {contacts.contacts.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 glass-surface rounded-lg"
            >
              <span className="font-medium">{contact.name}</span>
              <a
                href={`tel:${contact.number}`}
                className="text-blue-400 hover:text-blue-300 font-mono"
              >
                {contact.number}
              </a>
            </motion.div>
          ))}
        </div>
      </InfoCard>

      {/* Warning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 rounded-lg border-l-4 border-yellow-500"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-yellow-400 mb-1">
              {language === 'en' ? 'Important Notice' : 'Aviso Importante'}
            </h4>
            <p className="text-sm text-gray-300">
              {language === 'en'
                ? 'This information is for educational purposes only and does not constitute legal advice. Laws may vary by jurisdiction and situation. Consult with a qualified attorney for specific legal guidance.'
                : 'Esta información es solo para fines educativos y no constituye asesoramiento legal. Las leyes pueden variar según la jurisdicción y la situación. Consulte con un abogado calificado para orientación legal específica.'
              }
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
