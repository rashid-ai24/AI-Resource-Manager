const performanceMetrics = {};

export function measurePerformance(name, fn) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  performanceMetrics[name] = {
    duration,
    timestamp: Date.now(),
  };

  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  return result;
}

export async function measureAsyncPerformance(name, fn) {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;

  performanceMetrics[name] = {
    duration,
    timestamp: Date.now(),
  };

  console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  return result;
}

export function getPerformanceMetrics() {
  return { ...performanceMetrics };
}

export function clearPerformanceMetrics() {
  Object.keys(performanceMetrics).forEach((key) => {
    delete performanceMetrics[key];
  });
}

export default {
  measurePerformance,
  measureAsyncPerformance,
  getPerformanceMetrics,
  clearPerformanceMetrics,
};
