import React from 'react';
import styled from '@emotion/styled';
import Text from 'antd/lib/typography/Text';
import { Tag } from 'antd';

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
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </div>
      <ContentDescription id="content" dangerouslySetInnerHTML={{ __html: p }} />
    </ContentLayout>
  );
};

export default ContentForm;
