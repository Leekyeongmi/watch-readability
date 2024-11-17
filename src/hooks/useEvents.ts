import { useEffect } from 'react';

export default function useEvent(
  eventName: string,
  listener: (e?: any) => void,
) {
  useEffect(() => {
    window.addEventListener(eventName, listener);

    return () => {
      window.removeEventListener(eventName, listener);
    };
  }, []);
}
