import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ContentList from '../components/ContentList';
import { useRouter } from 'next/router';
import AppContents from '../components/layouts/AppContents';
import { Post } from '.';
import AppLoading from '../components/layouts/AppLoading';
import AppEmpty from '../components/layouts/AppEmpty';
import { useInfiniteScroll } from '../hooks';
import AppTitle from '../components/layouts/AppTitle';
import SEO from '../seo';
import ContentMe from '../components/ContentMe';

interface Props {
  post: Post[];
  postCount: number;
}

const pagePost = async (filter: string, page: number) => {
  return await axios.get(`/post?filter=${filter}&page=${page}`);
};

const Category = ({ post, postCount }: Props) => {
  const router = useRouter();
  const [postList, setPostList] = useState(post);
  const [isLoading, setIsLoading] = useState(false);
  const viewPort = useRef<any>(null);

  const data = {
    viewPort: viewPort.current,
    isLoading,
    limit: Math.ceil(postCount / 6),
  };
  const [lastElement, page] = useInfiniteScroll(data);

  useEffect(() => {
    if (page <= 1) return;
    if (page > data.limit) return;
    setIsLoading(true);
    pagePost(router.query.categories as string, page as number).then((res) => {
      setPostList([...postList, ...res.data.post]);
      setIsLoading(false);
    });
  }, [page]);

  useEffect(() => {
    setPostList(post);
  }, [post]);

  if (router.isFallback) {
    return <AppLoading />;
  }

  if (!post) {
    return <AppEmpty />;
  }
  return (
    <>
      <SEO desc={`${router.query.categories}에 대한 생각을 끄적인 곳`} />
      <AppTitle
        title={router.query?.categories as string}
        count={router.asPath === '/me' ? null : postCount}
      ></AppTitle>
      <AppContents>
        <>
          {router.asPath === '/me' ? (
            <ContentMe />
          ) : (
            <ContentList lastElement={lastElement} viewPort={viewPort} postList={postList}></ContentList>
          )}
          {isLoading && <AppLoading scroll={true} />}
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
  const { params } = ctx;
  const post: Props = await axios
    .get(`/post?filter=${encodeURI(params?.categories as string)}`)
    .then((res) => res.data);

  return {
    props: { post: post.post, postCount: post.postCount },
  };
};
