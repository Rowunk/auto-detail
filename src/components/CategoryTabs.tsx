// src/components/CategoryTabs.tsx
import React from 'react';
import PropTypes from 'prop-types';
import { CategoryTabsProps } from '../types/props';
import { ServiceCategory } from '../types';

type CategoryInfo = {
  key: ServiceCategory;
  label: string;
};

const categories: CategoryInfo[] = [
  { key: 'all',      label: '📋 Vše'        },
  { key: 'wash',     label: '🚿 Mytí'       },
  { key: 'exterior', label: '🚗 Exteriér'   },
  { key: 'wheels',   label: '⚙️ Kola'       },
  { key: 'interior', label: '🪑 Interiér'   },
  { key: 'protection', label: '🛡️ Ochrana' },
  { key: 'restoration', label: '🔧 Opravy'  },
  { key: 'specialty',  label: '⭐ Speciální'}
];

/**
 * Horizontal scrollable tabs for filtering services by category.
 *
 * @param {CategoryTabsProps} props - Component props
 * @param {ServiceCategory} props.active - Currently selected category
 * @param {Function} props.onChange - Callback when category is changed
 * @returns {React.ReactElement} Category tabs component
 * 
 * @example
 * <CategoryTabs 
 *   active="wash" 
 *   onChange={(category) => setActiveCategory(category)} 
 * />
 */
export default function CategoryTabs({ active, onChange }: CategoryTabsProps): React.ReactElement {
  return (
    <div className="flex space-x-2 overflow-x-auto px-2 py-1">
      {categories.map(cat => (
        <button
          key={cat.key}
          onClick={() => onChange(cat.key)}
          className={`whitespace-nowrap px-3 py-1 rounded-full text-sm font-semibold transition
            ${active === cat.key
              ? 'bg-blue-500 text-white shadow'
              : 'bg-white text-gray-700 border border-gray-300 dark:bg-primary dark:text-gray-200 dark:border-gray-600'}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

CategoryTabs.propTypes = {
  active: PropTypes.oneOf([
    'all', 'wash', 'exterior', 'wheels', 'interior', 
    'protection', 'restoration', 'specialty'
  ]).isRequired,
  onChange: PropTypes.func.isRequired
};