import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef } from 'react';
import { useScrollTop } from '../../hooks';
import { Post, PostItem } from '../../interfaces/post';
import { useAppSelector } from '../../store/hook';
import Anchors from './Anchors';
import ContentForm from './ContentForm';
import ContentRouteBtn from './ContentRouteBtn';
import ContentEditable from './ContentEditable';

const Content = styled.section`
  width: 100%;
`;

const ContentBlock = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 1.25em;
  max-width: 1000px;
  margin: 105px auto 0 auto;
`;

const ContentThumb = styled.div<{ url: string }>`
  background-attachment: fixed;
  position: relative;
  top: 75px;
  max-height: 500px;
  height: 100%;
  min-height: 250px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    padding: 0 0.2em;
    object-fit: contain;
    width: 100%;
    height: 100%;
    max-height: 500px;
  }
`;

interface Props {
  post: Post;
  anchor: string[];
  prev: PostItem | null;
  next: PostItem | null;
}

const ContentByTitle = ({ post, anchor, prev, next }: Props) => {
  const {
    auth: { user },
  } = useAppSelector((state) => state);
  const thumbRef = useRef<HTMLDivElement>(null);

  const handleOpacityAnchor = useCallback(() => {
    const thumbEl = thumbRef.current;
    if (thumbEl) {
      const height = thumbEl.clientHeight;
      const opa = 1 - (height - scrollY) / height;
      const anchor = document.querySelector('.anchor') as HTMLDivElement;
      if (anchor) {
        anchor.style.opacity = `${opa}`;
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', handleOpacityAnchor);
    return () => {
      document.removeEventListener('scroll', handleOpacityAnchor);
    };
  }, [handleOpacityAnchor]);

  useScrollTop();

  return (
    <>
      <Content>
        <ContentThumb url={post.thumb} ref={thumbRef}>
          <img src={post.thumb} alt="썸네일 이미지" />
        </ContentThumb>
        {user.admin && <ContentEditable post={post} />}
        <ContentBlock>
          <ContentForm tags={post.tags} date={post.createDate} title={post.title} p={post.description} />
        </ContentBlock>
        <Anchors anchor={anchor} />
      </Content>

      <ContentRouteBtn next={next} prev={prev} />
    </>
  );
};

export default ContentByTitle;
