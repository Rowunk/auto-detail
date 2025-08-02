// src/components/ServiceCard.tsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../contexts/ConfigContext';
import { sizeMultipliers } from '../services/serviceDatabase';
import { toggleFavorite, isFavorite } from '../utils/favorites';
import type { ServiceCardProps } from '../types/props';
import type { VehicleCondition } from '../types';

/**
 * Card component for an individual detailing service.
 * Enlarged tap-target for mobile thumb navigation.
 * Now includes favorite toggle functionality.
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
  const [isFavorited, setIsFavorited] = useState<boolean>(() => isFavorite(serviceKey));

  const condKey: VehicleCondition = currentCondition ?? 'excellent';
  const baseTime = service.times[condKey];
  const basePrice = service.basePrice[condKey];

  const adjustedTime = Math.round(
    (baseTime * sizeMultipliers[vehicleSize]) / workers
  );
  const adjustedPrice = Math.round(
    basePrice * sizeMultipliers[vehicleSize]
  );

  const handleFavoriteToggle = (e: React.MouseEvent): void => {
    e.stopPropagation(); // Prevent service selection when toggling favorite
    const success = toggleFavorite(serviceKey);
    if (success) {
      setIsFavorited(!isFavorited);
    }
  };

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
        ⏱️ {adjustedTime} min | 💰 {adjustedPrice} Kč
      </div>
      
      {/* Selection indicator */}
      <div className="absolute top-3 right-3 text-xl">
        {isSelected ? '✅' : '➕'}
      </div>
      
      {/* Favorite toggle */}
      <button
        onClick={handleFavoriteToggle}
        className={`absolute bottom-2 right-2 text-lg transition-all hover:scale-110 p-1.5 rounded-full font-bold
          ${isFavorited 
            ? 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg' 
            : 'text-gray-400 dark:text-gray-500 bg-transparent border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-yellow-400 hover:text-yellow-500'}`}
        title={isFavorited ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
        aria-label={isFavorited ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
      >
        ♥
      </button>
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