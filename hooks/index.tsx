import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

interface Props {
  viewPort: any;
  isLoading: boolean;
  limit: number;
}

export const useInfiniteScroll = ({ viewPort, isLoading, limit }: Props) => {
  const [page, setPage] = useState(0);
  const lastElement = useCallback(
    (node) => {
      if (isLoading || viewPort === undefined || node === null || page >= limit) {
        return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      viewPort = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          viewPort.disconnect();
          setPage((prev) => prev + 1);
        }
      });
      if (node) {
        viewPort.observe(node);
      }
    },
    [isLoading, viewPort, page, limit],
  );

  return [lastElement, page] as const;
};

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

// 무한스크롤수정

// export const useInfiniteScroll = ({ limit, isLoading }: Props) => {
//   const page = useRef(1);
//   const observe = useRef<IntersectionObserver | null>(null);

//   const lastElement = useCallback(
//     (node: HTMLDivElement) => {
//       if (isLoading || page.current >= limit) {
//         return;
//       }

//       const inifiniteScroll = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
//         const entry = entries[0];
//         if (entry.isIntersecting) {
//           observer.unobserve(entry.target);
//           page.current = page.current + 1;
//         }
//       };

//       observe.current = new IntersectionObserver(inifiniteScroll, { threshold: 0.5 });

//       if (node) {
//         observe.current.observe(node);
//       }
//     },
//     [isLoading, limit],
//   );

//   return { lastElement, page: page.current };
// };
