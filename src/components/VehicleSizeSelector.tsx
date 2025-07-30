// src/components/VehicleSizeSelector.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { VehicleSizeSelectorProps } from '../types/props';
import { VehicleSize } from '../types';

type SizeInfo = {
  key: VehicleSize;
  label: string;
  emoji: string;
};

const sizes: SizeInfo[] = [
  { key: 'small',  label: 'Malé',   emoji: '🚗' },
  { key: 'sedan',  label: 'Sedan',  emoji: '🚙' },
  { key: 'combi',  label: 'Kombi',  emoji: '🚘' },
  { key: 'suv',    label: 'SUV',    emoji: '🚚' },
  { key: 'van',    label: 'Van',    emoji: '🚐' },
  { key: 'truck',  label: 'Truck',  emoji: '🚛' }
];

/**
 * Component for selecting vehicle size, which affects pricing via multipliers.
 * Displays a grid of vehicle size options with visual indicators.
 *
 * @param {VehicleSizeSelectorProps} props - Component props
 * @param {VehicleSize} props.current - Currently selected vehicle size
 * @param {Function} props.onSelect - Callback when size is selected
 * @returns {React.ReactElement} Vehicle size selector component
 * 
 * @example
 * <VehicleSizeSelector
 *   current="suv"
 *   onSelect={(size) => setConfig(c => ({ ...c, vehicleSize: size }))}
 * />
 */
export default function VehicleSizeSelector({ current, onSelect }: VehicleSizeSelectorProps): React.ReactElement {
  return (
    <div className="p-4">
      <h3 className="text-center font-semibold mb-2">Velikost vozidla</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {sizes.map(s => (
          <button
            key={s.key}
            onClick={() => onSelect(s.key)}
            className={`flex flex-col items-center p-3 rounded-lg shadow-sm transition
              ${current === s.key
                ? 'bg-blue-500 text-white'
                : 'bg-white border border-gray-300 text-gray-700'}`}
          >
            <span className="text-2xl mb-1">{s.emoji}</span>
            <span className="text-sm font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

VehicleSizeSelector.propTypes = {
  current: PropTypes.oneOf(['small', 'sedan', 'combi', 'suv', 'van', 'truck']).isRequired,
  onSelect: PropTypes.func.isRequired
};