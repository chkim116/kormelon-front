import { Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import styled from '@emotion/styled';

const ContentBlock = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1.25em;
  max-width: 1000px;
  margin: 105px auto 0 auto;
`;
const Loading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const AppLoading = ({ text, scroll }: any) => {
  if (scroll) {
    return (
      <Loading>
        <Spin size="large"></Spin>
      </Loading>
    );
  }

  return (
    <ContentBlock>
      <Content>
        <Loading>
          <Spin size="large"></Spin>
          {text || <div>글 불러오는 중</div>}
        </Loading>
      </Content>
    </ContentBlock>
  );
};

export default AppLoading;
