// src/components/Toast.tsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import type { ToastProps } from '../types/props';

/**
 * Toast notification that auto-dismisses after 2.5s.
 * Displays a message to the user that automatically fades away.
 * 
 * @param {ToastProps} props - The component props
 * @param {string} props.message - Message to display in the toast
 * @param {Function} props.onDismiss - Callback function when toast should be dismissed
 * @returns {React.ReactElement} Toast notification component
 * 
 * @example
 * <Toast 
 *   message="Služba přidána" 
 *   onDismiss={() => setToastVisible(false)} 
 * />
 */
export default function Toast({ message, onDismiss }: ToastProps): React.ReactElement {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full shadow-lg z-50 animate-fade-in"
      role="alert"
    >
      {message}
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired
};