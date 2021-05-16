import { Spin } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import AppContents from './AppContents';
import styled from '@emotion/styled';

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
    <AppContents>
      <Content>
        <Loading>
          <Spin size="large"></Spin>
          {text && <div>글 불러오는 중</div>}
        </Loading>
      </Content>
    </AppContents>
  );
};

export default AppLoading;
