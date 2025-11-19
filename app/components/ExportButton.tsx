// =====================================================
// ExportButton Component
// =====================================================
// Export data to CSV or JSON format
// Supports filtered data export
// =====================================================

import { CountryData } from '../types';

interface ExportButtonProps {
  data: CountryData[];
  filename?: string;
}

export default function ExportButton({ data, filename = 'stable-index-data' }: ExportButtonProps) {
  const exportToCSV = () => {
    // CSV Headers
    const headers = [
      'Country Code',
      'Country Name',
      'SI Score',
      'Risk Level',
      'Youth Unemployment (Raw)',
      'Youth Unemployment (Norm)',
      'Food Inflation (Raw)',
      'Food Inflation (Norm)',
      'Palma Ratio (Raw)',
      'Palma Ratio (Norm)',
      'CPI (Raw)',
      'CPI (Norm)',
      'Calculation Date'
    ];

    // CSV Rows
    const rows = data.map(country => [
      country.country.code,
      `"${country.country.name}"`,
      country.current_uri.uri_score.toFixed(2),
      country.current_uri.risk_level,
      country.current_uri.youth_unemployment_raw.toFixed(2),
      country.current_uri.youth_unemployment_norm.toFixed(2),
      country.current_uri.food_inflation_raw.toFixed(2),
      country.current_uri.food_inflation_norm.toFixed(2),
      country.current_uri.palma_ratio_raw.toFixed(2),
      country.current_uri.palma_ratio_norm.toFixed(2),
      country.current_uri.cpi_raw.toFixed(0),
      country.current_uri.cpi_norm.toFixed(2),
      new Date(country.current_uri.calculation_date).toISOString().split('T')[0]
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create download
    downloadFile(csvContent, `${filename}.csv`, 'text/csv');
  };

  const exportToJSON = () => {
    const exportData = data.map(country => ({
      country: {
        code: country.country.code,
        name: country.country.name,
        flag: country.country.flag_emoji
      },
      uri: {
        score: country.current_uri.uri_score,
        risk_level: country.current_uri.risk_level,
        calculation_date: country.current_uri.calculation_date
      },
      indicators: {
        youth_unemployment: {
          raw: country.current_uri.youth_unemployment_raw,
          normalized: country.current_uri.youth_unemployment_norm
        },
        food_inflation: {
          raw: country.current_uri.food_inflation_raw,
          normalized: country.current_uri.food_inflation_norm
        },
        palma_ratio: {
          raw: country.current_uri.palma_ratio_raw,
          normalized: country.current_uri.palma_ratio_norm
        },
        corruption_index: {
          raw: country.current_uri.cpi_raw,
          normalized: country.current_uri.cpi_norm
        }
      }
    }));

    const jsonContent = JSON.stringify(exportData, null, 2);
    downloadFile(jsonContent, `${filename}.json`, 'application/json');
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="relative group">
      <button className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm 
                       font-medium text-neutral-700 hover:bg-neutral-50 transition-colors
                       flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Export Data
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg 
                    shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 z-10">
        <button
          onClick={exportToCSV}
          className="w-full px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50 
                   transition-colors flex items-center gap-3 rounded-t-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <div className="font-medium">Export CSV</div>
            <div className="text-xs text-neutral-500">{data.length} countries</div>
          </div>
        </button>
        <button
          onClick={exportToJSON}
          className="w-full px-4 py-3 text-left text-sm text-neutral-700 hover:bg-neutral-50 
                   transition-colors flex items-center gap-3 rounded-b-lg border-t border-neutral-100"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <div>
            <div className="font-medium">Export JSON</div>
            <div className="text-xs text-neutral-500">{data.length} countries</div>
          </div>
        </button>
      </div>
    </div>
  );
}


