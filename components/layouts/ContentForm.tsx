import React from 'react';
import styled from '@emotion/styled';
import Text from 'antd/lib/typography/Text';
import AppTags from './AppTags';
import Link from 'next/link';

const ContentLayout = styled.div`
  margin-bottom: 3em;

  img {
    width: 100%;
  }
`;

const ContentDescription = styled.div`
  padding: 0.5em;
`;

interface Props {
  date: string;
  title: string;
  p: string;
  tags: string[];
}

const ContentForm = ({ date, title, p, tags = [] }: Props) => {
  return (
    <ContentLayout>
      <Text>{date}</Text>
      <div className="content-title">{title}</div>
      <div>
        {tags.map((tag) => (
          <Link href={`/search/${tag}`} key={tag}>
            <AppTags>{tag}</AppTags>
          </Link>
        ))}
      </div>
      <ContentDescription id="content" dangerouslySetInnerHTML={{ __html: p }} />
    </ContentLayout>
  );
};

export default ContentForm;
