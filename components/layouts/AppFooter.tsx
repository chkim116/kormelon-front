import React from 'react';
import styled from '@emotion/styled';
import { Footer } from 'antd/lib/layout/layout';

const App = styled(Footer)`
  text-align: center;
  background-color: #ffffff;
  padding: 4em 0;
`;
interface AppProp {
  children: React.ReactChild;
}

const AppFooter = ({ children }: AppProp) => {
  return <App>{children}</App>;
};

export default AppFooter;
