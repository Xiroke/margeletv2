import type { ReactNode } from 'react';
import { ServiceWorkerProvider } from './serviceWorkerProvider';

export const AllProviders = ({ children }: { children: ReactNode }) => {
  return <ServiceWorkerProvider>{children}</ServiceWorkerProvider>;
};
