
import * as React from "react"

// Define standard breakpoints for responsive design
export const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
}

/**
 * Hook to detect if the current viewport is mobile-sized
 * @returns boolean indicating if the viewport is mobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

/**
 * Hook to detect current breakpoint
 * @returns current breakpoint ('xs', 'sm', 'md', 'lg', 'xl', '2xl')
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<keyof typeof BREAKPOINTS | undefined>(undefined)

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.xs) {
        setBreakpoint('xs');
      } else if (width < BREAKPOINTS.sm) {
        setBreakpoint('sm');
      } else if (width < BREAKPOINTS.md) {
        setBreakpoint('md');
      } else if (width < BREAKPOINTS.lg) {
        setBreakpoint('lg');
      } else if (width < BREAKPOINTS.xl) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}
