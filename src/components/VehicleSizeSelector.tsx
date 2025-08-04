// src/components/VehicleSizeSelector.tsx
import React from 'react';
import type { VehicleSizeSelectorProps } from '../types/props';
import type { VehicleSize } from '../types';

type SizeInfo = {
  key: VehicleSize;
  label: string;
  emoji: string;
};

const sizes: SizeInfo[] = [
  { key: 'small',   label: 'Malé',    emoji: '🚗' },
  { key: 'midsize', label: 'Střední', emoji: '🚕' },
  { key: 'sedan',   label: 'Sedan',   emoji: '🚙' },
  { key: 'combi',   label: 'Kombi',   emoji: '🚘' },
  { key: 'suv',     label: 'SUV',     emoji: '🚚' },
  { key: 'van',     label: 'Van',     emoji: '🚐' },
  { key: 'truck',   label: 'Truck',   emoji: '🚛' },
];

export default function VehicleSizeSelector({
  current,
  onSelect,
}: VehicleSizeSelectorProps): React.ReactElement {
  return (
    <div
      className="grid gap-4"
      style={{
        // responsive grid: as many 64px columns as fit, min 64px each
        gridTemplateColumns: 'repeat(auto-fit, minmax(64px, 1fr))',
      }}
    >
      {sizes.map((s) => {
        const isActive = s.key === current;
        return (
          <button
            key={s.key}
            type="button"
            aria-pressed={isActive}
            aria-label={s.label}
            onClick={() => onSelect(s.key)}
            className={[
              'flex flex-col items-center justify-center',
              'w-16 h-16 p-2 rounded-lg shadow-sm',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500',
              isActive
                ? 'bg-blue-500 text-white'
                : [
                    'bg-white dark:bg-gray-800',
                    'border border-gray-300 dark:border-gray-600',
                    'text-gray-700 dark:text-gray-200',
                    'hover:bg-gray-50 dark:hover:bg-gray-700',
                  ],
            ].flat().join(' ')}
          >
            <span className="text-4xl mb-1">{s.emoji}</span>
            <span className="text-sm font-medium">{s.label}</span>
          </button>
        );
      })}
    </div>
  );
}
