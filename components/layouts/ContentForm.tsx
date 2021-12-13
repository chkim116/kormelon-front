import React from 'react';
import styled from '@emotion/styled';
import AppTags from './AppTags';
import Link from 'next/link';

const ContentLayout = styled.div`
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`;

const ContentDescription = styled.div`
  padding: 1em 0.5em 0.5em 0.5em;

  p {
    font-size: 1.15em;
  }
`;

interface Props {
  date: string;
  title: string;
  p: string;
  tags: string[];
}

const ContentForm = ({ date, title, p, tags = [] }: Props) => {
  return (
    <>
      <ContentLayout>
        <small>{date}</small>
        <div className="content-title">{title}</div>
        <div>
          {tags.map((tag) => (
            <AppTags key={tag}>
              <Link href={`/search/${tag}`}>{tag}</Link>
            </AppTags>
          ))}
        </div>
        <ContentDescription id="content" dangerouslySetInnerHTML={{ __html: p }} />
      </ContentLayout>
    </>
  );
};

export default ContentForm;
