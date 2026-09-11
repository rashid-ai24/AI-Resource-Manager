import { useEffect } from 'react';
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

const vitalsCallback = (metric) => {
  console.log(`[Web Vitals] ${metric.name}:`, metric.value);
};

export function usePerformanceMonitoring(callback = vitalsCallback) {
  useEffect(() => {
    const reportWebVitals = (metric) => {
      callback(metric);
    };

    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onINP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  }, [callback]);
}

export default usePerformanceMonitoring;
