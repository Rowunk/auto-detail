// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';

/**
 * Application entry point that renders the root App component
 * into the DOM element with id 'root'.
 */
const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found in the document');
}

const root = createRoot(container);
root.render(<App />);