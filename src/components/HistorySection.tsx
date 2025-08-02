// src/components/HistorySection.tsx

import React, { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem
} from '../utils/storage';
import { ConfigContext } from '../contexts/ConfigContext';
import type { HistoryEntry } from '../types';
import Toast from './Toast';

// Timeline & animation
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';

// Sparkline chart
import { Sparklines, SparklinesLine } from 'react-sparklines';

// Confirmation wrapper
function useConfirm() {
  return (message: string, onConfirm: () => void) => {
    if (window.confirm(message)) onConfirm();
  };
}

export interface HistorySectionProps {
  onCopyServices?: (services: string[]) => void;
}

/**
 * A dynamic, animated vertical timeline of past jobs,
 * complete with revenue sparkline and interactive controls.
 */
export default function HistorySection({
  onCopyServices
}: HistorySectionProps): React.ReactElement {
  const { storageAvailable } = useContext(ConfigContext);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [toast, setToast] = useState<string>('');
  const confirm = useConfirm();

  // Load from localStorage once storage is ready
  useEffect(() => {
    if (storageAvailable) {
      const saved = getStorageItem<HistoryEntry[]>(
        'detailingHistoryGranular',
        []
      );
      setHistory(Array.isArray(saved) ? saved : []);
    }
  }, [storageAvailable]);

  // Derived data
  const normalizedHistory = useMemo(() => history, [history]);
  const totalJobs = normalizedHistory.length;
  const totalRevenue = normalizedHistory.reduce(
    (sum, e) => sum + (e.price || 0),
    0
  );

  // Build sparkline data
  const sparkData = useMemo(
    () => normalizedHistory.map((e) => e.price || 0),
    [normalizedHistory]
  );

  // Handlers
  const deleteEntry = (idx: number) =>
    confirm('Opravdu smazat tuto zakázku?', () => {
      if (!storageAvailable) {
        setToast('Lokální úložiště nedostupné');
        return;
      }
      const updated = normalizedHistory.filter((_, i) => i !== idx);
      setStorageItem('detailingHistoryGranular', updated);
      setHistory(updated);
      setToast('Zakázka smazána');
    });

  const clearAll = () =>
    confirm('Opravdu vymazat celou historii?', () => {
      if (!storageAvailable) {
        setToast('Lokální úložiště nedostupné');
        return;
      }
      removeStorageItem('detailingHistoryGranular');
      setHistory([]);
      setToast('Historie smazána');
    });

  const copyServices = (services: string[]) =>
    confirm('Kopírovat služby z této zakázky?', () => {
      onCopyServices?.(services);
      setToast('Služby zkopírovány do kalkulačky');
    });

  // Date formatter
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('cs-CZ', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
    []
  );

  return (
    <section className="p-4">
      {!storageAvailable && (
        <div
          role="alert"
          className="bg-yellow-100 p-3 mb-4 rounded text-yellow-800"
        >
          Lokální úložiště není dostupné.
        </div>
      )}

      {/* Header with sparkline */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📈 Trend obratu</h2>
          <button
            onClick={clearAll}
            disabled={!storageAvailable}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            🗑️ Vymazat vše
          </button>
        </div>
        <Sparklines data={sparkData} svgWidth={240} svgHeight={60}>
          <SparklinesLine style={{ strokeWidth: 3 }} />
        </Sparklines>
      </div>

      {normalizedHistory.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          <span className="text-6xl opacity-20 block">📊</span>
          <p className="mt-2">Žádné zakázky k zobrazení</p>
        </div>
      ) : (
        <VerticalTimeline lineColor="#CBD5E0">
          {normalizedHistory.map((entry, idx) => {
            // Parse & validate date
            const parsed = new Date(entry.date);
            const dateStr = Number.isFinite(parsed.getTime())
              ? dateFormatter.format(parsed)
              : entry.date;

            // Color by condition (example statuses)
            const color =
              entry.condition === 'Hotovo'
                ? '#10B981'
                : entry.condition === 'Probíhá'
                ? '#3B82F6'
                : '#F59E0B';

            return (
              <VerticalTimelineElement
                key={idx}
                date={dateStr}
                iconStyle={{ background: color, color: '#fff' }}
                contentStyle={{ borderTop: `4px solid ${color}` }}
                contentArrowStyle={{ borderRight: `7px solid ${color}` }}
                // Using a clipboard emoji as icon
                icon={<span style={{ fontSize: '1.25rem' }}>📋</span>}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <h3 className="text-lg font-bold mb-1">
                    {entry.services.length} služeb – {entry.condition}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Čas: <span className="font-medium">{entry.time}</span> •
                    Cena:{' '}
                    <span className="font-medium">
                      {entry.price.toLocaleString()} Kč
                    </span>
                  </p>
                  <div className="flex gap-4">
                    {onCopyServices && (
                      <button
                        onClick={() => copyServices(entry.services)}
                        disabled={!storageAvailable}
                        className="text-blue-600 hover:underline focus:outline-none"
                      >
                        📑 Kopírovat
                      </button>
                    )}
                    <button
                      onClick={() => deleteEntry(idx)}
                      disabled={!storageAvailable}
                      className="text-gray-500 hover:text-red-500 focus:outline-none"
                    >
                      🗑️ Smazat
                    </button>
                  </div>
                </motion.div>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      )}

      {/* Aggregate stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-3xl font-bold text-blue-600">{totalJobs}</div>
          <div className="text-sm text-gray-500">Celkem zakázek</div>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <div className="text-3xl font-bold text-blue-600">
            {totalRevenue.toLocaleString()} Kč
          </div>
          <div className="text-sm text-gray-500">Celkový obrat</div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onDismiss={() => setToast('')} />}
    </section>
  );
}

HistorySection.propTypes = {
  onCopyServices: PropTypes.func
};
