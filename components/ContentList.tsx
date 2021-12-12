import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Post } from '../pages';
import styled from '@emotion/styled';
import AppTags from './layouts/AppTags';
import { useInfiniteScroll } from '../hooks';
import AppLoading from './layouts/AppLoading';
import axios from 'axios';

const ContentContainer = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 300px);
  gap: 2em;

  @media all and (max-width: 1000px) {
    grid-template-columns: repeat(2, 300px);
  }

  @media all and (max-width: 700px) {
    grid-template-columns: repeat(1, 400px);
  }

  @media all and (max-width: 500px) {
    grid-template-columns: repeat(1, 300px);
    gap: 1em;
  }
`;

const ContentLayout = styled.div`
  padding-bottom: 1em;
  border-bottom: 1px dashed #dbdbdc;
  margin-bottom: 3em;
  cursor: pointer;

  h3 {
    font-size: 1.1rem;
    font-weight: 500;
    font-family: 'Nato Sans KR';
    opacity: 0.8;
    margin: 0.6em 0;
  }

  p {
    color: #959595;
  }
`;

const ContentImage = styled.div`
  width: 100%;
  min-width: 100%;
  text-align: center;
  img {
    width: 100%;
    min-height: 300px;
    object-fit: cover;
  }
`;

const pagePost = async (page: number, filter?: string) => {
  if (filter) {
    return await axios.get(`/post?filter=${filter}&page=${page}`);
  } else {
    return await axios.get(`/post?page=${page}`);
  }
};

interface Props {
  post: Post[];
  postCount: number;
  searching?: boolean;
  filter?: string;
}

const ContentList = ({ post, postCount, searching, filter }: Props) => {
  const [postList, setPostList] = useState<Post[]>(post);
  const [isLoading, setIsLoading] = useState(false);

  const viewPort = useRef<HTMLDivElement>(null);
  const isLimit = useMemo(() => {
    return Math.ceil(postCount / 6);
  }, [postCount]);

  const data = useMemo(() => {
    return { viewPort: viewPort.current, isLoading, limit: isLimit };
  }, [viewPort, isLoading, isLimit]);

  const [lastElement, page] = useInfiniteScroll(data);

  useEffect(() => {
    if (searching || page <= 1 || page > isLimit) {
      return;
    }
    setIsLoading(true);
    pagePost(page as number, filter).then((res) => {
      setPostList([...postList, ...res.data.post]);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searching]);

  useEffect(() => {
    setPostList(post);
  }, [post]);

  if (!post || post.length < 1) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>아직 발행된 글이 없습니다 :)</h3>
      </div>
    );
  }

  const PostCard = ({ postList }: { postList: Post[] }) => {
    return (
      <ContentContainer>
        {postList.map((post, index) => (
          <ContentLayout key={index}>
            <Link href={`/contents/${post.title}`}>
              <ContentImage>
                <img
                  src={
                    post.thumb ||
                    'https://assets-kormelon.s3.ap-northeast-2.amazonaws.com/img/roonz-2xEQDxB0ss4-unsplash.jpg'
                  }
                  alt={`${post.title} 썸네일`}
                />
              </ContentImage>
            </Link>

            <div>
              <Link href={`/${post.category}`}>{post.category}</Link>
            </div>
            <h3 ref={postList.length === index + 1 ? lastElement : null}>
              <Link href={`/contents/${post.title}`}>{post.title}</Link>
            </h3>
            <p>
              <Link href={`/contents/${post.title}`}>{post.preview}</Link>
            </p>
            <p>
              <small>{post.createDate}</small>
            </p>

            {post.tags.map((tag) => (
              <AppTags key={tag}>
                <Link href={`/search?select=tags&text=${tag}`}>{tag}</Link>
              </AppTags>
            ))}
          </ContentLayout>
        ))}
      </ContentContainer>
    );
  };

  return (
    <div ref={viewPort}>
      <PostCard postList={postList} />
      {isLoading && <AppLoading scroll={true} />}
    </div>
  );
};

export default ContentList;
