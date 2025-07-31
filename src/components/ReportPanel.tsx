// src/components/ReportPanel.tsx
import React, { useContext } from 'react';
import { calculateJob } from '../utils/jobCalculator';
import { ConfigContext } from '../contexts/ConfigContext';
import type { VehicleCondition } from '../types';

interface ReportPanelProps {
    selected: string[];
    condition: VehicleCondition | null;
}

export default function ReportPanel({
    selected,
    condition
}: ReportPanelProps): React.ReactElement {
    const { config } = useContext(ConfigContext);
    const { breakdown, totalTime, totalPrice, cost, profit, marginPct } =
        calculateJob(selected, condition, config);

    const fmtTime = (m: number) => {
        const h = Math.floor(m / 60);
        const mins = m % 60;
        return h > 0 ? `${h}h ${mins}min` : `${mins}min`;
    };

    return (
        <div className="h-full p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col">
            <h3 className="text-lg font-semibold mb-4">📊 Souhrn</h3>

            <div className="flex-1 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Služeb:</span>
                    <span>{selected.length}</span>
                </div>
                <div className="flex justify-between">
                    <span>Čas celkem:</span>
                    <span>{fmtTime(totalTime)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Cena celkem:</span>
                    <span>{totalPrice} Kč</span>
                </div>
                <div className="flex justify-between">
                    <span>Náklady:</span>
                    <span>{cost} Kč</span>
                </div>
                <div className="flex justify-between">
                    <span>Zisk:</span>
                    <span>{profit} Kč</span>
                </div>
                <div className="flex justify-between">
                    <span>Marže:</span>
                    <span>{marginPct}%</span>
                </div>
            </div>

            <button
                onClick={() => {
                    // Optional: scroll breakdown into view or open a detailed modal
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Detail
            </button>
        </div>
    );
}
