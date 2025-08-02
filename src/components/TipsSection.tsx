// src/components/TipsSection.tsx - Updated to use KnowledgeBase
import React from 'react';
import KnowledgeBase from './KnowledgeBase';
import type { TipsSectionProps } from '../types/props';

/**
 * TipsSection now serves as a wrapper for the comprehensive KnowledgeBase component.
 * Provides professional detailing knowledge, guides, and troubleshooting.
 * 
 * @returns {React.ReactElement} Knowledge base component
 * 
 * @example
 * <TipsSection />
 */
export default function TipsSection(): React.ReactElement {
  return <KnowledgeBase />;
}

// No PropTypes needed as this component has no props