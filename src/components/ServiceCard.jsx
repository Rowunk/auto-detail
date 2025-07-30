// src/components/ServiceCard.jsx
import React, { useContext } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { sizeMultipliers } from '../services/serviceDatabase';

export default function ServiceCard({
  serviceKey,
  service,
  isSelected,
  toggle,
  currentCondition,
}) {
  const { config } = useContext(ConfigContext);
  const { vehicleSize, workers } = config;

  const baseTime = currentCondition
    ? service.times[currentCondition]
    : service.times.excellent;
  const basePrice = currentCondition
    ? service.basePrice[currentCondition]
    : service.basePrice.excellent;

  const adjustedTime = Math.round(
    (baseTime * sizeMultipliers[vehicleSize]) / workers
  );
  const adjustedPrice = Math.round(
    basePrice * sizeMultipliers[vehicleSize]
  );

  return (
    <div
      onClick={() => toggle(serviceKey)}
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
