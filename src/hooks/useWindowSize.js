import { useState, useEffect } from 'react';

// Define the breakpoint for mobile
const MOBILE_BREAKPOINT = 800;

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    isMobile: false,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        isMobile: window.innerWidth < MOBILE_BREAKPOINT,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}