import { GetServerSideProps } from 'next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import ContentList from '../components/ContentList';
import AppContents from '../components/layouts/AppContents';
import { useInfiniteScroll } from '../hooks';
import AppLoading from '../components/layouts/AppLoading';
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

const pagePost = async (page: number) => {
  return await axios.get(`/post?page=${page}`);
};

export default function Home({ post, postCount }: Props) {
  const [postList, setPostList] = useState<Post[]>(post);
  const [isLoading, setIsLoading] = useState(false);

  const viewPort = useRef<any>(null);
  const isLimit = useMemo(() => {
    return Math.ceil(postCount / 6);
  }, [postCount]);
  const data = useMemo(() => {
    return { viewPort: viewPort.current, isLoading, limit: isLimit };
  }, [viewPort, isLoading, isLimit]);
  const [lastElement, page] = useInfiniteScroll(data);

  useEffect(() => {
    if (page <= 1) return;
    if (page > isLimit) return;
    setIsLoading(true);
    pagePost(page as number).then((res) => {
      setPostList([...postList, ...res.data.post]);
      setIsLoading(false);
    });
  }, [page]);
  return (
    <>
      <AppTitle title="all" count={postCount}></AppTitle>
      <AppContents>
        <>
          <ContentList viewPort={viewPort} postList={postList} lastElement={lastElement}></ContentList>
          {isLoading && <AppLoading scroll={true} />}
        </>
      </AppContents>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const post: Props = await axios.get('/post').then((res) => res.data);

  return {
    props: {
      post: post.post,
      postCount: post.postCount,
    },
  };
};
