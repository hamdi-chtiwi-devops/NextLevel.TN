import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Run the check after the component has mounted
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []); // The empty dependency array ensures this effect runs only once on the client

  return isMobile;
}
