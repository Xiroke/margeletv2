'use client';
import { apiAuth } from '../../model';
import { BearerResponse } from '../../types';

export const useIsAuth = (getAccessToken?: boolean) => {
  const { data } = apiAuth.getAccessToken();
  const status = !!data;

  if (getAccessToken && status) {
    return data as BearerResponse;
  } else if (!getAccessToken && status) {
    return true;
  }

  return false;
};
