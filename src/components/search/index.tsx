import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Post } from '../../interfaces/post';
import ContentList from '../home/common/ContentList';
import ContentTitle from '../home/common/ContentTitle';
import AppLoading from '../layouts/AppLoading';

const ContentBlock = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 1.25em;
  max-width: 1000px;
  margin: 120px auto 0 auto;
`;

const tagSearch = async (select: string, text: string, page: string) => {
  return await axios.get(`/tag/search?select=${select}&text=${text}&page=${page}`);
};

type PostList = {
  post: Post[];
  postCount: number;
};

const Search = () => {
  const { query } = useRouter();
  const [postList, setPostList] = useState<PostList>({ post: [], postCount: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query?.select && query?.text) {
      setIsLoading(() => true);
      tagSearch(query.select as string, query.text as string, (query.page as string) || '1')
        .then((res) => setPostList(res.data))
        .then(() => setIsLoading(() => false));
    }
  }, [query]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <ContentTitle title={(query?.text as string) || ''} count={postList.postCount || null}></ContentTitle>
      <ContentBlock>
        <>
          <ContentList
            post={postList.post}
            postCount={postList.postCount || 0}
            searching
            filter={`search?select=${query.select}&text=${query.text}`}
          ></ContentList>
          {isLoading && <AppLoading scroll={true} />}
        </>
      </ContentBlock>
    </>
  );
};

export default Search;
