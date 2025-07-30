// src/components/ResultCard.tsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ConfigContext } from '../contexts/ConfigContext';
import { serviceDatabase, sizeMultipliers } from '../services/serviceDatabase';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { formatMinutes } from '../utils/format';
import type { ResultCardProps } from '../types/props';
import type { VehicleCondition, HistoryEntry } from '../types';

type ServiceBreakdown = {
  name: string;
  time: number;
  price: number;
};

/**
 * Shows calculation results and offers save/share functionality.
 */
export default function ResultCard({
  selected = [],
  condition = null,
  onToast
}: ResultCardProps): React.ReactElement | null {
  const { config, storageAvailable } = useContext(ConfigContext);
  const { vehicleSize, workers, costRatio } = config;

  if (selected.length === 0) return null;

  const condKey: VehicleCondition = condition ?? 'excellent';
  const needsCond = condition == null;

  // calculate totals & breakdown
  let totalTime = 0;
  let totalPrice = 0;
  const breakdown: ServiceBreakdown[] = selected.map(key => {
    const svc = serviceDatabase[key];
    const baseTime = svc.times[condKey];
    const basePrice = svc.basePrice[condKey];
    const time = Math.round((baseTime * sizeMultipliers[vehicleSize]) / workers);
    const price = Math.round(basePrice * sizeMultipliers[vehicleSize]);
    totalTime += time;
    totalPrice += price;
    return { name: svc.name, time, price };
  });

  const cost = Math.round(totalPrice * costRatio);
  const profit = Math.round(totalPrice - cost);
  const marginPct = Math.round((profit / totalPrice) * 100);

  const toast = (msg: string) => onToast?.(msg);

  const handleSave = (): void => {
    if (!storageAvailable) {
      toast('Uložení není možné – lokální úložiště není dostupné');
      return;
    }
    const history = getStorageItem<HistoryEntry[]>('detailingHistoryGranular', []);
    const newEntry: HistoryEntry = {
      services: selected,
      condition: condKey,
      vehicleSize,
      price: totalPrice,
      time: formatMinutes(totalTime),
      date: new Date().toLocaleDateString('cs-CZ')
    };
    const newHistory = [...history, newEntry];
    const saved = setStorageItem('detailingHistoryGranular', newHistory);
    toast(saved ? 'Zakázka uložena ✅' : 'Uložení selhalo – zkuste smazat staré zakázky ⚠️');
  };

  const shareText = `
🚗 Detailing – ${totalPrice} Kč
Služeb: ${selected.length}
Stav: ${condKey}
Čas: ${formatMinutes(totalTime)}
${breakdown
      .map(b => `• ${b.name} – ${formatMinutes(b.time)}, ${b.price} Kč`)
      .join('\n')}
  `.trim();

  const handleShare = async (): Promise<void> => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Detailing zakázka', text: shareText });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        toast('Shrnutí zkopírováno do schránky 📋');
      } else {
        toast('Sdílení není podporováno na tomto zařízení');
      }
    } catch {
      toast('Sdílení zrušeno');
    }
  };

  const handleDetail = (): void => {
    toast('Detailní přehled se připravuje…');
  };

  return (
    <div className="mt-4 p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {selected.length === 1
            ? serviceDatabase[selected[0]].name
            : `${selected.length} služeb`}
        </h3>
        <span className="uppercase">{condition ?? '—'}</span>
      </div>

      {needsCond && (
        <div className="mb-4 text-xs bg-white bg-opacity-20 p-2 rounded">
          ⚠️ Vyberte <strong>Stav vozidla</strong>. Zatím se počítá s „excellent“.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4 text-center">
        <div>
          <div className="text-2xl font-bold">{formatMinutes(totalTime)}</div>
          <div className="text-xs opacity-80">Celkový čas</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalPrice} Kč</div>
          <div className="text-xs opacity-80">Celková cena</div>
        </div>
      </div>

      <div className="bg-white bg-opacity-20 p-3 rounded mb-4 text-xs">
        {breakdown.map((b, i) => (
          <div key={i} className="flex justify-between mb-1">
            <span>{i + 1}. {b.name}</span>
            <span>{formatMinutes(b.time)} | {b.price} Kč</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-center text-xs">
        <div>
          <div className="opacity-80">Náklady</div>
          <div className="font-semibold">{cost} Kč</div>
        </div>
        <div>
          <div className="opacity-80">Marže</div>
          <div className="font-semibold">{marginPct}%</div>
        </div>
        <div>
          <div className="opacity-80">Zisk</div>
          <div className="font-semibold">{profit} Kč</div>
        </div>
      </div>

      <div className="flex gap-2 text-sm">
        <button
          onClick={handleShare}
          className="flex-1 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition"
        >
          📤 Sdílet
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition"
        >
          💾 Uložit
        </button>
        <button
          onClick={handleDetail}
          className="flex-1 py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition"
        >
          📊 Detail
        </button>
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  condition: PropTypes.oneOf(['excellent', 'dirty', 'neglected', 'extreme', null]),
  onToast: PropTypes.func
};
