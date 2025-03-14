
import { useEffect, useRef } from 'react';

/**
 * A custom hook that detects clicks outside of the specified element
 * @param callback Function to call when a click outside occurs
 * @param isActive Only listen for outside clicks when this is true
 * @returns Object containing the ref to attach to the element
 */
const useClickOutside = <T extends HTMLElement>(
  callback: () => void,
  isActive: boolean = true
) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, isActive]);

  return { ref };
};

export default useClickOutside;
