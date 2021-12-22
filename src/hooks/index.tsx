import { useCallback, useEffect, useState } from 'react';

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
