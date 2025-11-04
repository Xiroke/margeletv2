import type { ReactNode } from 'react';

import { ServiceWorkerProvider } from './ServiceWorkerProvider';
import { WebsocketProvider } from './WebsocketProvider';

const disabledPathnameWs = ['/', '/registration'];

export const AllProviders = (props: { children: ReactNode | undefined }) => {
  const { children = null } = props;
  const pathname = window.location.pathname;

  const isDisabledWs = disabledPathnameWs.some((i) => pathname === i);

  return (
    <ServiceWorkerProvider>
      {isDisabledWs ? (
        <>{children}</>
      ) : (
        <WebsocketProvider>{children}</WebsocketProvider>
      )}
    </ServiceWorkerProvider>
  );
};
