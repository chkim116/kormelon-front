import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { Post } from '../pages';
import AppTags from './layouts/AppTags';

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
    max-height: 300px;
    border-radius: 8px;
    object-fit: cover;
  }
`;

export const ContentCard = ({ postList }: { postList: Post[] }) => {
  return (
    <ContentContainer>
      {postList.map((post, index) => (
        <ContentLayout key={index}>
          <Link href={`/contents/${encodeURIComponent(post.title)}`}>
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
          <h3>
            <Link href={`/contents/${encodeURIComponent(post.title)}`}>{post.title}</Link>
          </h3>
          <p>
            <Link href={`/contents/${encodeURIComponent(post.title)}`}>{post.preview}</Link>
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
