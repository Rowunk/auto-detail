// src/components/Toast.jsx
import React, { useEffect } from 'react';

/**
 * Toast notification that auto-dismisses after 2.5s.
 */
export default function Toast({ message, onDismiss }) {
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
