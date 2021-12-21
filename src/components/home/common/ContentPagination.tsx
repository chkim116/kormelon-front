import { css } from '@emotion/react';
import styled from '@emotion/styled';
import pagination from 'antd/lib/pagination';
import router, { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
const PostPagination = styled.div`
  padding: 1em 0;
  display: flex;
  justify-content: center;
`;

const PostPaginationArrowBtn = styled.button`
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid #dbdbdb;
`;

const PostPaginationBtn = styled.button<{ selected: boolean }>`
  width: 32px;
  height: 32px;
  border: 1px solid #dbdbdb;
  margin: 0 4px;
  background-color: ${({ selected, theme }) => (selected ? theme.border : theme.white)};
  &:disabled {
    background-color: ${({ theme }) => theme.border};
  }
  ${({ selected }) =>
    selected &&
    css`
      pointer-events: none;
    `};
`;

interface Props {
  postCount: number;
  searching?: boolean;
  filter?: string;
}

const ContentPagination = ({ postCount, searching, filter }: Props) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const isLimit = useMemo(() => {
    return Math.ceil(postCount / 6);
  }, [postCount]);

  const pagination = useMemo(() => {
    const pageNumArr = new Array(isLimit).fill(undefined).map((_, i) => i);
    const i = Math.ceil(+page / 10);
    const start = 10 * (i - 1);
    const end = 10 * i;
    return pageNumArr.slice(start, end);
  }, [isLimit, page]);

  const handlePagination = useCallback(
    (e) => {
      const pageNum = e.currentTarget.value;

      if (searching) {
        router.push(`/${filter}&page=${pageNum}`);
        return;
      }

      router.push(filter ? `/${filter}?page=${pageNum}` : `?page=${pageNum}`);
    },
    [filter, router, searching],
  );

  const handleArrowClick = useCallback(
    (e) => {
      const value = e.currentTarget.value;
      if (value === '-') {
        if (searching) {
          router.push(`/${filter}&page=${+page - 1}`);
          return;
        }
        router.push(filter ? `/${filter}?page=${+page - 1}` : `?page=${+page - 1}`);
      }
      if (value === '+') {
        if (searching) {
          router.push(`/${filter}&page=${+page + 1}`);
          return;
        }

        router.push(filter ? `/${filter}?page=${+page + 1}` : `?page=${+page + 1}`);
      }
    },
    [searching, router, filter, page],
  );

  useEffect(() => {
    if (!router.query.page) {
      setPage(1);
    }
    if (router.query.page) {
      setPage(+router.query.page);
    }
    return () => {};
  }, [router.query]);

  return (
    <PostPagination>
      <PostPaginationArrowBtn onClick={handleArrowClick} value="-" disabled={+page === 1}>
        <span>{'<'}</span>
      </PostPaginationArrowBtn>
      {pagination.map((i) => (
        <PostPaginationBtn selected={i === +page - 1} value={i + 1} onClick={handlePagination} key={i}>
          <span>{i + 1}</span>
        </PostPaginationBtn>
      ))}
      <PostPaginationArrowBtn onClick={handleArrowClick} value="+" disabled={+page === isLimit}>
        <span>{'>'}</span>
      </PostPaginationArrowBtn>
    </PostPagination>
  );
};

export default ContentPagination;
