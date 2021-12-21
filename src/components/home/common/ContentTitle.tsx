import styled from '@emotion/styled';
import React from 'react';

const ContentTitleContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  top: 90px;

  h2 {
    font-weight: 700;
    padding-bottom: 0.6em;
  }
`;

type Props = {
  title: string;
  count: number | null;
};

const ContentTitle = ({ title, count }: Props) => {
  return (
    <ContentTitleContainer>
      <h2>
        {'< '}
        {title.toUpperCase()}
        {' />'}
      </h2>
      {count !== null && <h3>{count} Post</h3>}
    </ContentTitleContainer>
  );
};

export default ContentTitle;
