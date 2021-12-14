import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';
import axios from 'axios';
import ContentList from '../components/ContentList';
import { useRouter } from 'next/router';
import AppContents from '../components/layouts/AppContents';
import { Post } from '.';
import AppLoading from '../components/layouts/AppLoading';
import AppEmpty from '../components/layouts/AppEmpty';
import AppTitle from '../components/layouts/AppTitle';
import SEO from '../seo';
import ContentMe from '../components/ContentMe';

interface Props {
  post: Post[];
  postCount: number;
}

const Category = ({ post, postCount }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <AppLoading />;
  }

  if (!post) {
    return <AppEmpty />;
  }
  return (
    <>
      <SEO desc={`${router.query.categories}에 대한 포스트`} />
      <AppTitle
        title={router.query?.categories as string}
        count={router.asPath === '/me' ? null : postCount}
      ></AppTitle>
      <AppContents>
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
      </AppContents>
    </>
  );
};

export default Category;

export interface Categories {
  _id?: string;
  category: string;
  post: any[];
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { params, query } = ctx;

  const filterUrl = `/post?filter=${encodeURIComponent(params?.categories as string)}`;
  const pageUrl = `/post?filter=${encodeURIComponent(params?.categories as string)}&page=${query.page}`;
  const isPage = query?.page;

  const post: Props = await axios.get(isPage ? pageUrl : filterUrl).then((res) => res.data);

  return {
    props: { post: post.post, postCount: post.postCount },
  };
};
