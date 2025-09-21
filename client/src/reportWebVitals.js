/**
 * reportWebVitals.js
 * 
 * Purpose: Measure and report Core Web Vitals (performance metrics) 
 * such as page load times, interactivity, and visual stability.
 * 
 * You can use this to send metrics to an analytics endpoint (e.g., Google Analytics)
 * or just log them to the console during development.
 */

const reportWebVitals = (onPerfEntry) => {
  // Ensure a valid callback function is provided
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the 'web-vitals' library
    // (only loads if performance reporting is needed)
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each Web Vital function, passing the callback
      // CLS = Cumulative Layout Shift (visual stability)
      getCLS(onPerfEntry);
      // FID = First Input Delay (responsiveness)
      getFID(onPerfEntry);
      // FCP = First Contentful Paint (loading performance)
      getFCP(onPerfEntry);
      // LCP = Largest Contentful Paint (main content load time)
      getLCP(onPerfEntry);
      // TTFB = Time To First Byte (backend/server speed)
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

