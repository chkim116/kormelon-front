import styled from '@emotion/styled';
import React from 'react';

const Tag = styled.span`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.border};
  opacity: 0.7;
  font-size: 12px;
  border-radius: 12px;
  padding: 0.2em 0.6em;
  white-space: pre;
  cursor: pointer;

  a {
    color: ${({ theme }) => theme.black};
  }
  & + & {
    margin-left: 3px;
  }
  &:hover {
    opacity: 0.4;
  }
`;

type Props = {
  children: React.ReactChild;
};

const AppTags = ({ children }: Props) => {
  return <Tag>{children}</Tag>;
};

export default AppTags;
