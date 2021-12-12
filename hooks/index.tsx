import { useCallback, useEffect } from 'react';
import useSWR from 'swr';

export const useScrollTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
};

export const useGlobalState = <T,>(key: string, defaultValue?: T | null) => {
  const { data: state = defaultValue, mutate } = useSWR(key, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });

  const setState = useCallback((value: any) => mutate(value, false), [mutate]);

  return [state, setState];
};
