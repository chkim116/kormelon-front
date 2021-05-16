import React from 'react';
import styled from '@emotion/styled';
import Text from 'antd/lib/typography/Text';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import { Tag } from 'antd';

const ContentLayout = styled.div`
  margin-bottom: 3em;

  .content__title {
    margin-top: 0.9em !important;
    padding-bottom: 1em;
    border-bottom: 1px dashed #dbdbdc;
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
    <ContentLayout>
      <Text>{date}</Text>
      <Title className="content__title">
        {title}
        <div>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </div>
      </Title>
      <Paragraph>
        <div dangerouslySetInnerHTML={{ __html: p }} />
      </Paragraph>
    </ContentLayout>
  );
};

export default ContentForm;
