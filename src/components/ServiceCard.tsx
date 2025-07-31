// src/components/ServiceCard.tsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../contexts/ConfigContext';
import { sizeMultipliers } from '../services/serviceDatabase';
import type { ServiceCardProps } from '../types/props';
import type { VehicleCondition } from '../types';

/**
 * Card component for an individual detailing service.
 * Enlarged tap-target for mobile thumb navigation.
 */
export default function ServiceCard({
  serviceKey,
  service,
  isSelected,
  toggle,
  currentCondition,
}: ServiceCardProps): React.ReactElement {
  const { config } = useContext(ConfigContext);
  const { vehicleSize, workers } = config;

  const condKey: VehicleCondition = currentCondition ?? 'excellent';
  const baseTime = service.times[condKey];
  const basePrice = service.basePrice[condKey];

  const adjustedTime = Math.round(
    (baseTime * sizeMultipliers[vehicleSize]) / workers
  );
  const adjustedPrice = Math.round(
    basePrice * sizeMultipliers[vehicleSize]
  );

  return (
    <button
      onClick={() => toggle(serviceKey)}
      className={`
        relative flex flex-col justify-between p-4 min-h-[6rem] border rounded-lg shadow-sm transition 
        hover:scale-105 focus:outline-none
        ${isSelected ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'}
      `}
      aria-pressed={isSelected}
    >
      <div className="font-semibold text-base mb-2 text-left">
        {service.name}
      </div>
      <div className="text-sm text-gray-700 text-left">
        ⏱️ {adjustedTime} min | 💰 {adjustedPrice} Kč
      </div>
      <div className="absolute top-3 right-3 text-xl">
        {isSelected ? '✅' : '➕'}
      </div>
    </button>
  );
}

ServiceCard.propTypes = {
  serviceKey: PropTypes.string.isRequired,
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    times: PropTypes.object.isRequired,
    basePrice: PropTypes.object.isRequired
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  currentCondition: PropTypes.oneOf(['excellent', 'dirty', 'neglected', 'extreme', null])
};
