export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
];

export const COMMON_SCENARIOS = [
  'Traffic Stop',
  'Street Encounter',
  'Home Visit',
  'Workplace Interaction',
  'Public Space Encounter',
  'Vehicle Search',
  'ID Request',
  'Questioning'
];

export const BASIC_RIGHTS = {
  en: {
    title: 'Your Basic Rights',
    rights: [
      'You have the right to remain silent',
      'You have the right to refuse searches',
      'You have the right to leave if not detained',
      'You have the right to record interactions',
      'You have the right to an attorney'
    ]
  },
  es: {
    title: 'Sus Derechos Básicos',
    rights: [
      'Tiene derecho a permanecer en silencio',
      'Tiene derecho a rechazar registros',
      'Tiene derecho a irse si no está detenido',
      'Tiene derecho a grabar interacciones',
      'Tiene derecho a un abogado'
    ]
  }
};

export const EMERGENCY_CONTACTS = {
  en: {
    title: 'Emergency Contacts',
    contacts: [
      { name: 'Emergency Services', number: '911' },
      { name: 'ACLU Rights Hotline', number: '877-328-2258' },
      { name: 'Legal Aid', number: '211' }
    ]
  },
  es: {
    title: 'Contactos de Emergencia',
    contacts: [
      { name: 'Servicios de Emergencia', number: '911' },
      { name: 'Línea de Derechos ACLU', number: '877-328-2258' },
      { name: 'Asistencia Legal', number: '211' }
    ]
  }
};
