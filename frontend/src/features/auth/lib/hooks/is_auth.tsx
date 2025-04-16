'use client';
import { apiAuth } from '../../model';

export const useIsAuth = (getAccessToken?: boolean) => {
  const { data } = apiAuth.getAccessToken();
  const status = !!data;

  if (getAccessToken && status) {
    return data;
  } else if (!getAccessToken && status) {
    return true;
  }

  return false;
};
