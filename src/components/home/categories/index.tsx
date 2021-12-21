import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { Post } from '../../../interfaces/post';
import ContentEmpty from '../common/ContentEmpty';
import ContentList from '../common/ContentList';
import ContentTitle from '../common/ContentTitle';
import ContentMe from '../../me/ContentMe';
import AppLoading from '../../layouts/AppLoading';

const ContentBlock = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 1.25em;
  max-width: 1000px;
  margin: 105px auto 0 auto;
`;

interface Props {
  post: Post[];
  postCount: number;
}

const CategoriesContent = ({ post, postCount }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <AppLoading />;
  }

  if (!post) {
    return <ContentEmpty />;
  }

  return (
    <>
      <ContentTitle
        title={router.query?.categories as string}
        count={router.asPath === '/me' ? null : postCount}
      ></ContentTitle>
      <ContentBlock>
        <>
          {router.asPath === '/me' ? (
            <ContentMe />
          ) : (
            <ContentList
              post={post}
              postCount={postCount}
              filter={(router.query?.categories as string) || ''}
            ></ContentList>
          )}
        </>
      </ContentBlock>
    </>
  );
};

export default CategoriesContent;
