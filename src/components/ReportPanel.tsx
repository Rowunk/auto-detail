// src/components/ReportPanel.tsx
import React, { useState, useContext } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { ConfigContext } from '../contexts/ConfigContext';
import { calculateJob } from '../utils/jobCalculator';
import { formatMinutes } from '../utils/format';  // ← use formatMinutes
import type { ReportPanelProps } from '../types/props';
import type { HistoryEntry } from '../types';
import Toast from './Toast';

/**
 * Summary panel for current selection.
 * Shows totals, allows toggling details and confirming (saving) the job.
 */
export default function ReportPanel({
    selected,
    condition
}: ReportPanelProps): React.ReactElement {
    const { config, storageAvailable } = useContext(ConfigContext);
    const [showDetails, setShowDetails] = useState(false);
    const [toast, setToast] = useState('');

    // Compute breakdown and P&L
    const {
        breakdown,
        totalTime,
        totalPrice,
        cost,
        profit,
        marginPct
    } = calculateJob(selected, condition, config);

    const handleConfirm = (): void => {
        if (!storageAvailable) {
            setToast('Lokální úložiště není dostupné');
            return;
        }
        const history = getStorageItem<HistoryEntry[]>('detailingHistoryGranular', []);
        const newEntry: HistoryEntry = {
            services: selected,
            condition: condition ?? 'excellent',
            vehicleSize: config.vehicleSize,
            price: totalPrice,
            time: formatMinutes(totalTime),    // ← renamed
            date: new Date().toLocaleDateString('cs-CZ')
        };
        setStorageItem('detailingHistoryGranular', [...history, newEntry]);
        setToast('Zakázka uložena ✅');
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4 mb-4 text-center text-sm">
                <div>
                    <div className="text-2xl font-bold">{formatMinutes(totalTime)}</div>
                    <div>Čas práce</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{totalPrice} Kč</div>
                    <div>Cena</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{cost} Kč</div>
                    <div>Náklady</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{profit} Kč</div>
                    <div>Zisk ({marginPct} %)</div>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setShowDetails(d => !d)}
                    className="flex-1 py-2 bg-white border rounded hover:bg-gray-50"
                >
                    {showDetails ? 'Skrýt detaily' : 'Detaily'}
                </button>
                <button
                    onClick={handleConfirm}
                    className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Potvrdit
                </button>
            </div>

            {showDetails && (
                <div className="bg-white p-2 rounded shadow text-xs mb-4">
                    {breakdown.map((b, i) => (
                        <div key={i} className="flex justify-between py-1 border-b last:border-none">
                            <span>{b.name}</span>
                            <span>
                                {formatMinutes(b.time)} / {b.price} Kč
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
        </div>
    );
}
