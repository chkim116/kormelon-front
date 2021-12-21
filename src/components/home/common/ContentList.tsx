import React from 'react';
import { ContentCard } from './ContentCard';
import { Post } from '../../../interfaces/post';
import AppLoading from '../../layouts/AppLoading';
import ContentPagination from './ContentPagination';

interface Props {
  post: Post[];
  postCount: number;
  filter?: string;
  searching?: boolean;
}

const ContentList = ({ post, postCount, filter, searching }: Props) => {
  if (!post || post.length < 1) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>아직 발행된 글이 없습니다 :)</h3>
      </div>
    );
  }

  return (
    <>
      <ContentCard postList={post} />
      {!post && <AppLoading scroll={true} />}
      <ContentPagination postCount={postCount} filter={filter} searching={searching} />
    </>
  );
};

export default ContentList;
