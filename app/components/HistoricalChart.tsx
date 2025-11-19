import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import { HistoricalData } from '../../types/index';
import { dataService } from '../../lib/supabase';

interface HistoricalChartProps {
  data?: HistoricalData[];
  selectedCountry?: string;
  countryCode?: string;
}

export const HistoricalChart = ({ data, selectedCountry, countryCode }: HistoricalChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    try {
      if (!chartRef.current) return;
      if (!chartData || chartData.length === 0) return;
      if (!targetCountry) return;

      console.log('Initializing chart with data:', chartData.length, 'records');

      const chart = echarts.init(chartRef.current);

      const countryData = chartData.filter(d => d.country_code === targetCountry);
      if (!countryData || countryData.length === 0) {
        console.warn('No data found for country:', targetCountry);
        return;
      }
      
      const color = '#3B82F6'; // Blue for single country

      const series = [{
        name: targetCountry,
        type: 'line',
        data: countryData.map(d => d.uri_score || 0),
        smooth: true,
        lineStyle: { width: 2, color },
        itemStyle: { color },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.15)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0)' }
            ]
          }
        }
      }];

      const dates = countryData.map(d => {
        try {
          const date = new Date(d.date);
          if (isNaN(date.getTime())) {
            return d.date;
          }
          return date.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
        } catch (err) {
          console.warn('Invalid date format:', d.date);
          return d.date;
        }
      });

      const option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#ffffff',
          borderColor: '#E5E5E5',
          borderWidth: 1,
          padding: 16,
          textStyle: { color: '#171717', fontSize: 14 },
          formatter: (params: any) => {
            let result = `<div style="font-weight: 600; margin-bottom: 8px; font-size: 15px;">${params[0].axisValue}</div>`;
            params.forEach((param: any) => {
              result += `
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${param.color};"></span>
                  <span style="color: #737373;">${param.seriesName}:</span>
                  <strong style="margin-left: auto;">${param.value?.toFixed(2) || 'N/A'}</strong>
                </div>
              `;
            });
            return result;
          }
        },
        legend: { data: [targetCountry], top: 0 },
        grid: { left: '5%', right: '5%', bottom: '15%', top: '15%', containLabel: true },
        xAxis: {
          type: 'category',
          data: dates,
          axisLine: { show: false },
          axisLabel: {
            color: '#737373',
            fontSize: 12,
            rotate: dates.length > 12 ? 45 : 0
          }
        },
        yAxis: {
          type: 'value',
          name: 'URI Score',
          nameTextStyle: { color: '#737373', fontSize: 13, padding: [0, 0, 0, 0] },
          axisLine: { show: false },
          axisLabel: { color: '#737373', fontSize: 12 },
          splitLine: { lineStyle: { color: '#E5E5E5', type: 'dashed' } }
        },
        series
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    } catch (err) {
      console.error('Error in HistoricalChart useEffect:', err);
      setError('Error initializing chart');
    }
  }, [chartData, targetCountry]);

  return (
    <div className="bg-white rounded-xl p-8 shadow-card border border-neutral-200">
      <div className="mb-6">
        <h3 className="text-heading-md font-semibold text-neutral-900 mb-2">
          Historical URI Trends (12 Months)
        </h3>
        <p className="text-body text-neutral-600">
          {loading ? 'Loading historical data...' : 
           targetCountry ? `Showing data for ${targetCountry}` : 
           'Select a country to view trends'}
        </p>
      </div>
      
      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-neutral-600">Loading chart data...</span>
        </div>
      )}
      
      {error && (
        <div className="flex items-center justify-center h-64 text-red-600">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">Error Loading Data</div>
            <div className="text-sm">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {!loading && !error && chartData.length === 0 && (
        <div className="flex items-center justify-center h-64 text-neutral-500">
          <div className="text-center">
            <div className="text-lg font-semibold mb-2">No Data Available</div>
            <div className="text-sm">No historical data found for this country</div>
          </div>
        </div>
      )}
      
      {!loading && !error && chartData.length > 0 && (
        <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
      )}
    </div>
  );
};