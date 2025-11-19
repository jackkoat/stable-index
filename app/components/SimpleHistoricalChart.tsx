import { useState, useEffect } from 'react';
import { HistoricalData } from '../../types';
import { dataService } from '../../lib/supabase';

interface SimpleHistoricalChartProps {
  data?: HistoricalData[];
  selectedCountry?: string;
  countryCode?: string;
}

export const SimpleHistoricalChart = ({ data, selectedCountry, countryCode }: SimpleHistoricalChartProps) => {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const targetCountry = selectedCountry || countryCode;

  useEffect(() => {
    const fetchHistoricalData = async () => {
      if (!targetCountry) {
        setHistoricalData([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const data = await dataService.getHistoricalData(targetCountry);
        
        // Enhanced data validation
        const validData = Array.isArray(data) ? data.filter(item => {
          if (!item || typeof item !== 'object') return false;
          
          // Check required fields exist and are valid
          const hasDate = item.date && typeof item.date === 'string';
          const hasScore = item.uri_score !== null && item.uri_score !== undefined && !isNaN(Number(item.uri_score));
          const hasCountryCode = item.country_code && typeof item.country_code === 'string';
          
          if (!hasDate || !hasScore || !hasCountryCode) {
            console.warn('Invalid historical data item:', item);
            return false;
          }
          
          return true;
        }).map(item => ({
          date: item.date,
          uri_score: Number(item.uri_score),
          country_code: item.country_code
        })) : [];
        
        console.log('Valid historical data loaded:', validData.length, 'records for', targetCountry);
        setHistoricalData(validData);
        
        if (validData.length === 0) {
          console.warn('No valid historical data found for country:', targetCountry);
        }
      } catch (err) {
        console.error('Error fetching historical data:', err);
        setError('Failed to load historical data');
        setHistoricalData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, [targetCountry]);

  const chartData = data || historicalData;

  const getRiskColor = (score: number) => {
    if (score <= 40) return 'text-green-400';
    if (score <= 60) return 'text-yellow-400';
    if (score <= 80) return 'text-orange-400';
    return 'text-red-400';
  };

  const getRiskLevel = (score: number) => {
    if (score <= 40) return 'Low Risk';
    if (score <= 60) return 'Moderate Risk';
    if (score <= 80) return 'High Risk';
    return 'Critical Risk';
  };

  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-8">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Historical URI Trends (12 Months)
        </h3>
        <p className="text-blue-200">
          {loading ? 'Loading historical data...' : 
           targetCountry ? `Showing data for ${targetCountry}` : 
           'Select a country to view trends'}
        </p>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-blue-200">Loading chart data...</span>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center h-64 text-red-400">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">Error Loading Data</div>
            <div className="text-sm">{error}</div>
          </div>
        </div>
      )}
      
      {!loading && !error && chartData.length === 0 && (
        <div className="flex items-center justify-center h-64 text-blue-200">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">No Data Available</div>
            <div className="text-sm">No historical data found for this country</div>
          </div>
        </div>
      )}
      
      {!loading && !error && chartData.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {chartData.slice(0, 6).map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-200 text-sm">
                    {new Date(item.date).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
                  </span>
                  <span className={`font-semibold ${getRiskColor(item.uri_score)}`}>
                    {getRiskLevel(item.uri_score)}
                  </span>
                </div>
                <div className="text-white text-xl font-bold">
                  {item.uri_score.toFixed(1)}
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      item.uri_score <= 40 ? 'bg-green-400' :
                      item.uri_score <= 60 ? 'bg-yellow-400' :
                      item.uri_score <= 80 ? 'bg-orange-400' :
                      'bg-red-400'
                    }`}
                    style={{ width: `${Math.min(item.uri_score, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Data Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-200">Data Points:</span>
                <span className="text-white ml-2 font-semibold">{chartData.length}</span>
              </div>
              <div>
                <span className="text-blue-200">Avg Score:</span>
                <span className="text-white ml-2 font-semibold">
                  {(chartData.reduce((sum, item) => sum + item.uri_score, 0) / chartData.length).toFixed(1)}
                </span>
              </div>
              <div>
                <span className="text-blue-200">Latest:</span>
                <span className="text-white ml-2 font-semibold">
                  {chartData[chartData.length - 1]?.uri_score.toFixed(1) || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-blue-200">Country:</span>
                <span className="text-white ml-2 font-semibold">{targetCountry}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};