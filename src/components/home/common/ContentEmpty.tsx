import styled from '@emotion/styled';
import { Button, Empty } from 'antd';
import React from 'react';

const ContentBlock = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 1.25em;
  max-width: 1000px;
  margin: 105px auto 0 auto;
`;

const ContentEmpty = ({ text = '죄송하지만.. 게시글을 못불러 왔네요..' }: { text?: string }) => {
  return (
    <ContentBlock>
      <div style={{ textAlign: 'center', lineHeight: 10 }}>
        <Empty description={text}></Empty>
        <Button type="primary" onClick={() => history.back()}>
          뒤로가기
        </Button>
      </div>
    </ContentBlock>
  );
};

export default ContentEmpty;
