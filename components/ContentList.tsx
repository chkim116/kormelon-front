import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Post } from '../pages';
import AppLoading from './layouts/AppLoading';
import { useRouter } from 'next/router';
import { ContentCard } from './ContentCard';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const PostPagination = styled.div`
  padding: 1em 0;
`;

const PostPaginationArrowBtn = styled.button`
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
`;

const PostPaginationBtn = styled.button<{ selected: boolean }>`
  width: 32px;
  height: 32px;
  border: 1px solid #dbdbdb;
  margin: 0 4px;
  background-color: ${({ selected }) => (selected ? '#dbdbdb' : '#ffffff')};
  &:disabled {
    background-color: #fafbfc;
  }
  ${({ selected }) =>
    selected &&
    css`
      pointer-events: none;
    `};
`;

interface Props {
  post: Post[];
  postCount: number;
  searching?: boolean;
  filter?: string;
}

const ContentList = ({ post, postCount, searching, filter }: Props) => {
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
      router.push(filter ? `/${filter}?page=${pageNum}` : `?page=${pageNum}`);
    },
    [filter, router],
  );

  const handleArrowClick = useCallback(
    (e) => {
      const value = e.currentTarget.value;
      if (value === '-') {
        router.push(filter ? `/${filter}?page=${+page - 1}` : `?page=${+page - 1}`);
      }
      if (value === '+') {
        router.push(filter ? `/${filter}?page=${+page + 1}` : `?page=${+page + 1}`);
      }
    },
    [router, filter, page],
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

  if (!post || post.length < 1) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>아직 발행된 글이 없습니다 :)</h3>
      </div>
    );
  }

  return (
    <div>
      <ContentCard postList={post} />
      {!post && <AppLoading scroll={true} />}

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
    </div>
  );
};

export default ContentList;
