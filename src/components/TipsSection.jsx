// src/components/TipsSection.jsx
import React from 'react';

const tips = [
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

export default function TipsSection() {
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
