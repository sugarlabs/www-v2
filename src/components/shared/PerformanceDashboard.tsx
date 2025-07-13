import React, { useState, useEffect } from 'react';
import { getLazyLoadingMetrics } from '@/hooks/useLazyLoading';

interface PerformanceDashboardProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  isVisible = false,
  onClose,
}) => {
  const [metrics, setMetrics] = useState(getLazyLoadingMetrics());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics([...getLazyLoadingMetrics()]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const averageLoadTime =
    metrics.length > 0
      ? metrics.reduce((sum, m) => sum + (m.loadDuration || 0), 0) /
        metrics.length
      : 0;

  const successfulLoads = metrics.filter((m) => m.success);
  const failedLoads = metrics.filter((m) => !m.success);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">
          Performance Dashboard
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs px-2 py-1 bg-red-100 hover:bg-red-200 rounded text-red-600"
            >
              Close
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-green-50 p-2 rounded">
            <div className="font-medium text-green-800">Success</div>
            <div className="text-green-600">{successfulLoads.length}</div>
          </div>
          <div className="bg-red-50 p-2 rounded">
            <div className="font-medium text-red-800">Failed</div>
            <div className="text-red-600">{failedLoads.length}</div>
          </div>
        </div>

        <div className="bg-blue-50 p-2 rounded">
          <div className="font-medium text-blue-800">Avg Load Time</div>
          <div className="text-blue-600">{averageLoadTime.toFixed(0)}ms</div>
        </div>

        {isExpanded && (
          <div className="mt-3 border-t pt-3">
            <h4 className="font-medium text-gray-700 mb-2">Recent Loads</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {metrics
                .slice(-5)
                .reverse()
                .map((metric, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="truncate">{metric.componentName}</span>
                    <span
                      className={`font-mono ${
                        metric.success ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {metric.loadDuration?.toFixed(0)}ms
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDashboard;
