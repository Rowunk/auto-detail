// src/components/SearchBar.jsx
import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';

/**
 * Debounced text search bar.
 */
export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value);

  /** Debounce parent setter by 250 ms */
  const debounced = useMemo(
    () => debounce(onChange, 250),
    [onChange]
  );

  /** Send updates as user types */
  useEffect(() => {
    debounced(local);
  }, [local, debounced]);

  /** Keep local value in sync with external changes */
  useEffect(() => {
    setLocal(value);
  }, [value]);

  /* Cleanup on unmount */
  useEffect(() => () => debounced.cancel(), [debounced]);

  return (
    <div className="p-2">
      <input
        value={local}
        onChange={e => setLocal(e.target.value)}
        type="text"
        placeholder="🔍 Hledat služby..."
        className="w-full px-2 py-1 border-2 border-gray-300 rounded-full text-sm
                   focus:outline-none focus:border-blue-500 transition"
      />
    </div>
  );
}
