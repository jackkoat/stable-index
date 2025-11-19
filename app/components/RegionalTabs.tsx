// =====================================================
// Regional Tabs - Clean & Professional
// =====================================================
// Simple regional filtering without emojis
// =====================================================

import { regions } from '@/data/mockData';

interface RegionalTabsProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  countryCounts?: Record<string, number>;
}

export default function RegionalTabs({
  selectedRegion,
  onSelectRegion,
  countryCounts = {}
}: RegionalTabsProps) {
  const regionList = ['All', ...Object.keys(regions)];

  // Region display names
  const regionConfig: Record<string, { label: string }> = {
    'All': { label: 'All Regions' },
    'Asia-Pacific': { label: 'Asia-Pacific' },
    'Europe': { label: 'Europe' },
    'Americas': { label: 'Americas' },
    'MENA': { label: 'MENA' },
    'Other': { label: 'Other' }
  };

  return (
    <div className="w-full">
      {/* Desktop Tabs */}
      <div className="hidden md:flex items-center gap-2 bg-surface-tertiary p-2 rounded-lg border border-surface-border">
        {regionList.map((region) => {
          const config = regionConfig[region];
          const count = region === 'All' 
            ? Object.values(countryCounts).reduce((sum, c) => sum + c, 0)
            : countryCounts[region] || 0;
          const isActive = selectedRegion === region;

          return (
            <button
              key={region}
              onClick={() => onSelectRegion(region)}
              className={`
                flex-1 px-4 py-3 rounded-md font-semibold text-body-md transition-all duration-normal 
                flex items-center justify-center gap-2
                ${isActive
                  ? 'bg-accent-navy/20 text-accent-navy border border-accent-navy/50 shadow-glow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }
              `}
            >
              <span className="uppercase tracking-wide">{config.label}</span>
              {count > 0 && (
                <span className={`
                  ml-1 px-2 py-0.5 rounded text-micro font-bold uppercase tracking-wider
                  ${isActive 
                    ? 'bg-accent-navy text-white' 
                    : 'bg-surface-border text-text-muted'
                  }
                `}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <select
          value={selectedRegion}
          onChange={(e) => onSelectRegion(e.target.value)}
          className="w-full px-4 py-3 bg-surface-tertiary border border-surface-border rounded-md 
                     text-text-primary font-semibold focus:outline-none focus:border-accent-navy 
                     focus:shadow-glow-sm"
        >
          {regionList.map((region) => {
            const config = regionConfig[region];
            const count = region === 'All' 
              ? Object.values(countryCounts).reduce((sum, c) => sum + c, 0)
              : countryCounts[region] || 0;

            return (
              <option key={region} value={region} className="bg-surface-tertiary">
                {config.label} ({count})
              </option>
            );
          })}
        </select>
      </div>

      {/* Active Region Info */}
      {selectedRegion !== 'All' && (
        <div className="mt-3 px-4 py-3 bg-accent-navy/5 border border-accent-navy/20 rounded-md">
          <p className="text-body-md text-text-secondary">
            <span className="font-bold text-accent-navy uppercase tracking-wider">
              {regionConfig[selectedRegion]?.label}
            </span>
            {' '}— Showing {countryCounts[selectedRegion] || 0} monitored regions
          </p>
        </div>
      )}
    </div>
  );
}
