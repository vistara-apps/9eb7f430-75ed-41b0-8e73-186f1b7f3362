import OpenAI from 'openai';
import { ScriptRequest, GeneratedScript } from './types';
import { generateId } from './utils';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateScript(request: ScriptRequest): Promise<GeneratedScript> {
  const { scenario, state, language, userContext } = request;
  
  const systemPrompt = `You are a legal rights advisor helping people understand their rights during police encounters. 
  Generate practical, legally accurate scripts for ${state} state law. 
  Focus on de-escalation, constitutional rights, and safety.
  
  Language: ${language === 'es' ? 'Spanish' : 'English'}
  
  Provide:
  1. A calm, respectful script to use
  2. 3-5 things TO say
  3. 3-5 things NOT to say
  4. Additional safety tips
  
  Keep responses concise and practical for high-stress situations.`;

  const userPrompt = `Scenario: ${scenario} in ${state}
  ${userContext ? `Context: ${JSON.stringify(userContext)}` : ''}
  
  Generate a helpful script and guidance.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0]?.message?.content || '';
    
    // Parse the AI response (simplified parsing)
    const sections = content.split('\n\n');
    const script = sections[0] || '';
    const doSay = extractListItems(content, 'TO say', 'NOT to say');
    const dontSay = extractListItems(content, 'NOT to say', 'Additional');
    const additionalTips = extractListItems(content, 'Additional', '');

    return {
      id: generateId(),
      scenario,
      script,
      doSay,
      dontSay,
      additionalTips,
      language,
      state
    };
  } catch (error) {
    console.error('Error generating script:', error);
    
    // Fallback response
    return {
      id: generateId(),
      scenario,
      script: language === 'es' 
        ? 'Manténgase calmado. Tiene derecho a permanecer en silencio.'
        : 'Stay calm. You have the right to remain silent.',
      doSay: language === 'es'
        ? ['Manténgase calmado', 'Ejerza su derecho al silencio', 'Pida un abogado']
        : ['Stay calm', 'Exercise your right to remain silent', 'Ask for a lawyer'],
      dontSay: language === 'es'
        ? ['No resista físicamente', 'No mienta', 'No discuta']
        : ['Don\'t physically resist', 'Don\'t lie', 'Don\'t argue'],
      additionalTips: language === 'es'
        ? ['Mantenga las manos visibles', 'Grabe si es posible']
        : ['Keep hands visible', 'Record if possible'],
      language,
      state
    };
  }
}

function extractListItems(content: string, startMarker: string, endMarker: string): string[] {
  const startIndex = content.indexOf(startMarker);
  if (startIndex === -1) return [];
  
  const endIndex = endMarker ? content.indexOf(endMarker, startIndex) : content.length;
  const section = content.substring(startIndex, endIndex === -1 ? content.length : endIndex);
  
  const lines = section.split('\n');
  return lines
    .filter(line => line.trim().match(/^[\d\-\*•]/))
    .map(line => line.replace(/^[\d\-\*•\s]+/, '').trim())
    .filter(line => line.length > 0);
}
