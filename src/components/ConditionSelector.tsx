// src/components/ConditionSelector.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { ConditionSelectorProps } from '../types/props';
import { VehicleCondition } from '../types';

type ConditionInfo = {
  key: VehicleCondition;
  label: string;
  emoji: string;
  bg: string;
};

const CONDITIONS: ConditionInfo[] = [
  { key: 'excellent', label: 'ČISTÉ',     emoji: '🟢', bg: 'from-green-400 to-green-500'   },
  { key: 'dirty',     label: 'ŠPINAVÉ',   emoji: '🟡', bg: 'from-yellow-400 to-yellow-500' },
  { key: 'neglected', label: 'ZANEDBANÉ', emoji: '🔴', bg: 'from-red-400   to-red-500'     },
  { key: 'extreme',   label: 'EXTRÉMNÍ',  emoji: '🟣', bg: 'from-purple-400 to-purple-500' }
];

/**
 * Component for selecting the vehicle condition, which affects service times and prices.
 * Displays a grid of condition options with visual indicators.
 *
 * @param {ConditionSelectorProps} props - Component props
 * @param {VehicleCondition|null} props.current - Currently selected condition
 * @param {Function} props.onSelect - Callback when condition is selected
 * @returns {React.ReactElement} Condition selector component
 * 
 * @example
 * <ConditionSelector
 *   current="dirty"
 *   onSelect={(condition) => setCondition(condition)}
 * />
 */
export default function ConditionSelector({ current, onSelect }: ConditionSelectorProps): React.ReactElement {
  return (
    <div className="p-4">
      <h3 className="text-center font-semibold mb-2">Stav vozidla</h3>
      <div className="grid grid-cols-4 gap-3">
        {CONDITIONS.map(c => (
          <button
            key={c.key}
            onClick={() => onSelect(c.key)}
            className={
              `flex flex-col items-center p-3 rounded-lg shadow-sm transition transform hover:scale-95
               ${current === c.key
                 ? `bg-gradient-to-br ${c.bg} text-white`
                 : 'bg-white border border-gray-300 text-gray-700'}`
            }
          >
            <span className="text-2xl mb-1">{c.emoji}</span>
            <span className="text-sm font-medium">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

ConditionSelector.propTypes = {
  current: PropTypes.oneOf(['excellent', 'dirty', 'neglected', 'extreme', null]),
  onSelect: PropTypes.func.isRequired
};