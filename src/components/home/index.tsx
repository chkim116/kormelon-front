import styled from '@emotion/styled';
import React from 'react';
import { Post } from '../../interfaces/post';
import ContentList from './common/ContentList';
import ContentTitle from './common/ContentTitle';

const ContentBlock = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 1.25em;
  max-width: 1000px;
  margin: 120px auto 0 auto;
`;

interface Props {
  post: Post[];
  postCount: number;
}

const Home = ({ post, postCount }: Props) => {
  return (
    <>
      <ContentTitle title="all" count={postCount}></ContentTitle>
      <ContentBlock>
        <ContentList post={post} postCount={postCount}></ContentList>
      </ContentBlock>
    </>
  );
};

export default Home;
