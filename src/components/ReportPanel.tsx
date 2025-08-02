// src/components/ReportPanel.tsx
import React, { useState, useContext, useMemo } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { incrementUsage } from '../utils/favorites';
import { ConfigContext } from '../contexts/ConfigContext';
import { calculateJob } from '../utils/jobCalculator';
import { formatMinutes } from '../utils/format';
import type { ReportPanelProps } from '../types/props';
import type { HistoryEntry } from '../types';
import Toast from './Toast';

/**
 * Summary panel for current selection.
 * Shows totals, allows toggling details, overrides prices,
 * applying discounts/markups, adding notes, and confirming (saving) the job.
 * Now tracks service usage for favorites system.
 */
export default function ReportPanel({
    selected,
    condition
}: ReportPanelProps): React.ReactElement {
    const { config, storageAvailable } = useContext(ConfigContext);
    const [showDetails, setShowDetails] = useState(false);
    const [toast, setToast] = useState('');

    // Base P&L from utils
    const { breakdown, totalTime, totalPrice, cost, profit, marginPct } =
        calculateJob(selected, condition, config);

    // Overrides keyed by service name
    const [overrides, setOverrides] = useState<Record<string, number>>({});
    // Discount (%) and flat adjustment (Kč)
    const [discountPct, setDiscountPct] = useState<number>(0);
    const [flatAdj, setFlatAdj] = useState<number>(0);
    // Notes for adjustment
    const [notes, setNotes] = useState<string>('');

    // Adjusted per‐service prices
    const adjustedBreakdown = useMemo(
        () =>
            breakdown.map(item => ({
                ...item,
                adjustedPrice:
                    overrides[item.name] != null ? overrides[item.name] : item.price
            })),
        [breakdown, overrides]
    );

    // Subtotal after overrides
    const subtotal = useMemo(
        () =>
            adjustedBreakdown.reduce((sum, b) => sum + b.adjustedPrice, 0),
        [adjustedBreakdown]
    );
    // After percentage discount
    const afterDiscount = useMemo(
        () => Math.round(subtotal * (1 - discountPct / 100)),
        [subtotal, discountPct]
    );
    // Grand total with flat adjustment
    const grandTotal = afterDiscount + flatAdj;

    const handleConfirm = (): void => {
        if (!storageAvailable) {
            setToast('Lokální úložiště není dostupné');
            return;
        }

        // Save to history
        const history = getStorageItem<HistoryEntry[]>(
            'detailingHistoryGranular',
            []
        );
        const newEntry: HistoryEntry = {
            services: selected,
            condition: condition ?? 'excellent',
            vehicleSize: config.vehicleSize,
            price: grandTotal,
            time: formatMinutes(totalTime),
            date: new Date().toLocaleDateString('cs-CZ')
        };
        setStorageItem('detailingHistoryGranular', [...history, newEntry]);

        // Track usage for favorites system
        const usageTracked = incrementUsage(selected);
        
        if (usageTracked) {
            setToast('Zakázka uložena ✅ (statistiky aktualizovány)');
        } else {
            setToast('Zakázka uložena ✅');
        }
    };

    return (
        <div>
            {/* Top summary grid */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-center text-sm">
                <div>
                    <div className="text-2xl font-bold">
                        {formatMinutes(totalTime)}
                    </div>
                    <div>Čas práce</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{totalPrice} Kč</div>
                    <div>Původní cena</div>
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

            {/* Overrides & adjustments panel */}
            <div className="space-y-4 mb-4 p-4 bg-white rounded shadow">
                {/* Subtotal */}
                <div className="flex justify-between font-semibold">
                    <span>Mezisoučet (s přetížením)</span>
                    <span>{subtotal.toLocaleString()} Kč</span>
                </div>

                {/* Percentage Discount */}
                <div className="flex justify-between items-center">
                    <label className="text-sm">Sleva (%)</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={discountPct}
                        onChange={e =>
                            setDiscountPct(Math.min(100, Math.max(0, +e.target.value)))
                        }
                        className="w-16 text-right border-b border-gray-300 focus:outline-none"
                    />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Po slevě</span>
                    <span>{afterDiscount.toLocaleString()} Kč</span>
                </div>

                {/* Flat-rate adjustment */}
                <div className="flex justify-between items-center">
                    <label className="text-sm">Úprava (+/– Kč)</label>
                    <input
                        type="number"
                        value={flatAdj}
                        onChange={e => setFlatAdj(+e.target.value || 0)}
                        className="w-20 text-right border-b border-gray-300 focus:outline-none"
                    />
                </div>

                {/* Grand total */}
                <div className="flex justify-between font-bold text-lg">
                    <span>Celkem po úpravě</span>
                    <span>{grandTotal.toLocaleString()} Kč</span>
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Poznámky k úpravě
                    </label>
                    <textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        rows={3}
                        className="w-full border rounded px-2 py-1 focus:outline-none"
                        placeholder="Vysvětlení slevy nebo přirážky..."
                    />
                </div>
            </div>

            {/* Action buttons */}
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

            {/* Detailed list with inline overrides */}
            {showDetails && (
                <div className="bg-white p-2 rounded shadow text-xs mb-4">
                    {adjustedBreakdown.map((b, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center py-1 border-b last:border-none"
                        >
                            <span>{b.name}</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">
                                    {formatMinutes(b.time)}
                                </span>
                                /
                                <input
                                    type="number"
                                    value={b.adjustedPrice}
                                    onChange={e => {
                                        const v = +e.target.value || 0;
                                        setOverrides(o => ({ ...o, [b.name]: v }));
                                    }}
                                    className="w-16 text-right bg-transparent border-b border-gray-300 focus:outline-none"
                                />
                                <span className="text-xs">Kč</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
        </div>
    );
}