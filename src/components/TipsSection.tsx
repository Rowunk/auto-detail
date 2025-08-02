// src/components/TipsSection.tsx
import React from 'react';
import { TipsSectionProps } from '../types/props';

type Tip = {
  title: string;
  text: string;
  accent: string;
};

const tips: Tip[] = [
  {
    title: '⭐ Oblíbené služby',
    text: 'Označte nejčastěji používané služby hvězdičkou pro rychlý přístup. Aplikace také automaticky sleduje nejpoužívanější služby.',
    accent: 'border-yellow-500',
  },
  {
    title: '🎯 Granulární přístup',
    text: 'Kombinujte služby pro optimální výsledek. Každá služba má specifické požadavky a pořadí.',
    accent: 'border-green-500',
  },
  {
    title: '⏱️ Časová optimalizace',
    text: 'Některé služby lze kombinovat – např. čištění skel při aplikaci sealantu.',
    accent: 'border-blue-500',
  },
  {
    title: '💰 Cenová strategie',
    text: 'Balíčkové ceny jsou často výhodnější než jednotlivé služby.',
    accent: 'border-purple-500',
  },
];

/**
 * Displays professional tips for detailing services.
 * Contains static information about best practices and new features.
 *
 * @returns {React.ReactElement} Tips section component
 * 
 * @example
 * <TipsSection />
 */
export default function TipsSection(): React.ReactElement {
  return (
    <section className="p-4">
      <div className="bg-white rounded-lg shadow mb-4 p-4">
        <h3 className="text-lg font-semibold mb-4">💡 Profesionální tipy pro granulární služby</h3>
        <div className="grid gap-4">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className={`p-4 bg-gray-50 rounded-lg border-l-4 ${tip.accent}`}
            >
              <h4 className="font-semibold">{tip.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// No PropTypes needed as this component has no props