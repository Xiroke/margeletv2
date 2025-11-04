import type { ReactNode } from 'react';

import { useEffect } from 'react';

import { settings } from '@/config';

export const ServiceWorkerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  useEffect(() => {
    if (typeof window == 'undefined') {
      return;
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker registered'))
        .catch(() => console.error('Service Worker registration failed'));

      navigator.serviceWorker.ready.then((registration) => {
        if (!registration.active) {
          return;
        }

        registration.active.postMessage({
          payload: {
            BACKEND_URL: settings.VITE_BACKEND_URL,
          },
          type: 'SET_PARAMS',
        });
      });
    }
  }, []);
  return <>{children}</>;
};
