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
 * Now includes favorite toggle functionality and is disabled when no condition is selected.
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

  const isDisabled = currentCondition === null;

  const handleFavoriteToggle = (e: React.MouseEvent): void => {
    e.stopPropagation(); // Prevent service selection when toggling favorite
    const success = toggleFavorite(serviceKey);
    if (success) {
      setIsFavorited(!isFavorited);
    }
  };

  const handleServiceToggle = (): void => {
    if (isDisabled) return; // Prevent selection when disabled
    toggle(serviceKey);
  };

  return (
    <div
      className={`
        relative flex flex-col justify-between p-4 min-h-[6rem] border rounded-lg shadow-sm transition 
        ${isDisabled 
          ? 'opacity-50 cursor-not-allowed bg-gray-100 border-gray-200' 
          : `${isSelected ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'}`
        }
      `}
    >
      {/* Main service button - covers entire card */}
      <button
        onClick={handleServiceToggle}
        disabled={isDisabled}
        className={`
          absolute inset-0 rounded-lg focus:outline-none z-0
          ${!isDisabled ? 'hover:scale-105' : ''}
        `}
        aria-pressed={isSelected}
        title={isDisabled ? 'Nejprve vyberte stav vozidla' : undefined}
      />

      <div className="font-semibold text-base mb-2 text-left relative z-10 pointer-events-none">
        {service.name}
      </div>
      <div className="text-sm text-gray-700 text-left relative z-10 pointer-events-none">
        ⏱️ {adjustedTime} min | 💰 {adjustedPrice} Kč
        {currentCondition === null && (
          <div className="text-xs text-red-500 mt-1">
            Vyberte stav vozidla
          </div>
        )}
      </div>
      
      {/* Selection indicator - only show when not disabled */}
      {!isDisabled && (
        <div className="absolute top-3 right-3 text-xl pointer-events-none z-10">
          {isSelected ? '✅' : '➕'}
        </div>
      )}
      
      {/* Disable overlay when no condition selected */}
      {isDisabled && (
        <div className="absolute top-3 right-3 text-xl text-red-500 pointer-events-none z-10">
          ⚠️
        </div>
      )}
      
      {/* Favorite toggle - separate button, not nested */}
      <button
        onClick={handleFavoriteToggle}
        className={`absolute bottom-2 right-2 text-lg transition-all hover:scale-110 p-1.5 rounded-full font-bold z-20
          ${isFavorited 
            ? 'text-white bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg' 
            : 'text-gray-400 dark:text-gray-500 bg-transparent border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-yellow-400 hover:text-yellow-500'}`}
        title={isFavorited ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
        aria-label={isFavorited ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}
      >
        ♥
      </button>
    </div>
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