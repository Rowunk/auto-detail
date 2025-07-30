// src/components/ServiceCard.tsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../contexts/ConfigContext';
import { sizeMultipliers } from '../services/serviceDatabase';
import { ServiceCardProps } from '../types/props';
import { VehicleCondition } from '../types';

/**
 * Card component for an individual detailing service.
 * Shows service name, adjusted time and price, and allows toggling selection.
 *
 * @param {ServiceCardProps} props - Component props
 * @param {string} props.serviceKey - Unique identifier for the service
 * @param {ServiceItem} props.service - Service data object
 * @param {boolean} props.isSelected - Whether the service is currently selected
 * @param {Function} props.toggle - Callback to toggle selection state
 * @param {VehicleCondition|null} props.currentCondition - Currently selected vehicle condition
 * @returns {React.ReactElement} Service card component
 * 
 * @example
 * <ServiceCard
 *   serviceKey="snow-foam"
 *   service={serviceDatabase['snow-foam']}
 *   isSelected={selected.includes('snow-foam')}
 *   toggle={toggleService}
 *   currentCondition="dirty"
 * />
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

  const handleClick = (): void => {
    toggle(serviceKey);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between gap-2 p-2 border rounded shadow-sm transition transform hover:scale-95 cursor-pointer ${
        isSelected ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'
      }`}
    >
      <div>
        <div className="font-semibold text-sm">{service.name}</div>
        <div className="text-xs text-gray-600">
          ⏱️ {adjustedTime} min&nbsp;&nbsp;💰 {adjustedPrice} Kč
        </div>
      </div>
      <div className="text-lg">{isSelected ? '✅' : '➕'}</div>
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