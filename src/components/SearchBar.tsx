// src/components/SearchBar.tsx
import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import lodashDebounce from 'lodash.debounce';
import type { SearchBarProps } from '../types/props';

// support both CJS and ESM default-export shapes
const debounce: typeof lodashDebounce =
  typeof lodashDebounce === 'function'
    ? lodashDebounce
    : // @ts-ignore
      lodashDebounce.default;

export default function SearchBar({ value, onChange }: SearchBarProps): React.ReactElement {
  const [local, setLocal] = useState<string>(value);

  const debounced = useRef(
    debounce((term: string) => {
      onChange(term);
    }, 250)
  );

  useEffect(() => {
    debounced.current = debounce((term: string) => {
      onChange(term);
    }, 250);
  }, [onChange]);

  useEffect(() => {
    debounced.current(local);
  }, [local]);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => () => debounced.current.cancel(), []);

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
        className="w-full px-2 py-1 border-2 border-gray-300 dark:border-gray-600 rounded-full
                   bg-white dark:bg-card text-current placeholder-gray-500 dark:placeholder-gray-400
                   text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition"
      />
    </div>
  );
}
