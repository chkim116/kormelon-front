import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import ContentList from '../components/ContentList';
import AppContents from '../components/layouts/AppContents';
import AppTitle from '../components/layouts/AppTitle';

export interface Post {
  _id: string;
  title: string;
  thumb: string;
  preview: string;
  description: string;
  createDate: string;
  updated?: string;
  creator?: string;
  tags: string[];
  category: string;
}

export interface Props {
  post: Post[];
  postCount: number;
}

export default function Home({ post, postCount }: Props) {
  return (
    <>
      <AppTitle title="all" count={postCount}></AppTitle>
      <AppContents>
        <>
          <ContentList post={post} postCount={postCount}></ContentList>
        </>
      </AppContents>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const pageUrl = `/post?page=${query.page}`;
  const isPage = query.page;

  const post: Props = await axios.get(isPage ? pageUrl : '/post').then((res) => res.data);
  return {
    props: {
      post: post.post,
      postCount: post.postCount,
    },
  };
};
