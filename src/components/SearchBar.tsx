// src/components/SearchBar.tsx
import type { ChangeEvent } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import type { SearchBarProps } from '../types/props';

/**
 * Debounced text search bar for filtering services.
 *
 * @param {SearchBarProps} props - Component props
 * @param {string} props.value - Current search term
 * @param {Function} props.onChange - Callback when search term changes (debounced)
 * @returns {React.ReactElement} Search bar component
 * 
 * @example
 * <SearchBar
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 * />
 */
export default function SearchBar({ value, onChange }: SearchBarProps): React.ReactElement {
  const [local, setLocal] = useState<string>(value);

  /** Debounce parent setter by 250 ms */
  const debounced = useMemo(
    () => debounce((term: string) => onChange(term), 250),
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocal(e.target.value);
  };

  return (
    <div className="p-2">
      <input
        value={local}
        onChange={handleChange}
        type="text"
        placeholder="🔍 Hledat služby..."
        className="w-full px-2 py-1 border-2 border-gray-300 rounded-full text-sm
                   focus:outline-none focus:border-blue-500 transition"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};