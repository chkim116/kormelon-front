import styled from '@emotion/styled';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const TitleContaier = styled(Title)`
  position: relative;
  font-size: 3rem !important;
  top: 55px;
  display: flex;
  align-items: center;
  font-family: 'Nanum Myeongjo', serif;
  color: ${({ theme }) => theme.white} !important;
  justify-content: center;
  max-height: 500px;
  min-height: 250px;
  margin: 0 !important;
  overflow: auto;
  background-image: url('https://images.unsplash.com/photo-1529101091764-c3526daf38fe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80');
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
`;

type Props = {
  title: string;
};

const AppTitle = ({ title }: Props) => {
  return <TitleContaier>{title.toUpperCase()}</TitleContaier>;
};

export default AppTitle;
