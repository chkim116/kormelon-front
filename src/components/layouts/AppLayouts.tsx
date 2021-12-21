import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/hook';
import { getAuthRequest } from '../../store/reducer/auth';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const Layout = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
`;

interface Props {
  children: React.ReactNode;
}

const AppLayouts = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuthRequest());
  }, []);

  return (
    <Layout>
      <AppHeader />
      {children}
      <AppFooter />
    </Layout>
  );
};

export default AppLayouts;