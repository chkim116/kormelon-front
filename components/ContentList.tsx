import Link from 'next/link';
import React from 'react';
import { Post } from '../pages';
import styled from '@emotion/styled';

import { Picsum } from 'picsum-photos';
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
    object-fit: cover;
  }
`;

const ContentList = ({ postList, viewPort, lastElement }: { postList: Post[]; viewPort?: any; lastElement?: any }) => {
  const PostCard = () => {
    return (
      <ContentContainer>
        {postList.map((post, index) => (
          <Link key={index} href={`/contents/${post.title}`}>
            <ContentLayout ref={postList.length === index + 1 ? lastElement : null}>
              <ContentImage>
                <img src={post.thumb || Picsum.url()} alt={`${post.title} 썸네일`} />
              </ContentImage>
              <div>
                <Link href={`/${post.category}`}>{post.category}</Link>
              </div>
              <h3>{post.title}</h3>
              <p>{post.preview}</p>
              <p>
                <small>{post.createDate}</small>
              </p>

              {post.tags.map((tag) => (
                <Link href={`/search/${tag}`} key={tag}>
                  <AppTags>{tag}</AppTags>
                </Link>
              ))}
            </ContentLayout>
          </Link>
        ))}
      </ContentContainer>
    );
  };

  return (
    <div ref={viewPort}>
      <PostCard />
    </div>
  );
};

export default ContentList;
