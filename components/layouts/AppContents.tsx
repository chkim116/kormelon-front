import React from 'react';
import styled from '@emotion/styled';
import Layout, { Content } from 'antd/lib/layout/layout';

export const AppContentLayout = styled(Layout)`
  width: 100%;
  background-color: #ffffff;
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 90px;
`;

export const AppContent = styled(Content)`
  width: 100%;
  min-height: 100vh;
  padding: 1.25em;
  max-width: 1000px;
  margin: 0 auto;
`;

const AppContents = ({ children }: { children: React.ReactChild }) => {
  return (
    <AppContentLayout>
      <AppContent>{children}</AppContent>
      {/* <AppSider /> */}
    </AppContentLayout>
  );
};

export default AppContents;
