// Main component with lazy loading support
import React from 'react';
export { CryptoCommunitySection } from './CryptoCommunitySection';

// Sub-components for granular lazy loading
export { SectionHeader } from './SectionHeader';
export { BenefitsList, benefits } from './BenefitsList';
export { BenefitCard, type BenefitItem } from './BenefitCard';
export { CallToAction } from './CallToAction';

// Lazy loading helper
export const CryptoCommunitySectionLazy = {
  SectionHeader: React.lazy(() => import('./SectionHeader').then(module => ({ default: module.SectionHeader }))),
  BenefitsList: React.lazy(() => import('./BenefitsList').then(module => ({ default: module.BenefitsList }))),
  CallToAction: React.lazy(() => import('./CallToAction').then(module => ({ default: module.CallToAction }))),
  main: React.lazy(() => import('./CryptoCommunitySection').then(module => ({ default: module.CryptoCommunitySection })))
};

// Re-export everything for convenience
export * from './CryptoCommunitySection';
export * from './SectionHeader';
export * from './BenefitsList';
export * from './BenefitCard';
export * from './CallToAction';