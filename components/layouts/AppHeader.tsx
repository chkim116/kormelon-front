import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Header } from 'antd/lib/layout/layout';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useGlobalState } from '../../hooks';

const App = styled(Header)<{ scaleheight: string }>`
  position: fixed;
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  height: ${({ scaleheight }) => (scaleheight === 'true' ? '65px' : '55px')};
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  z-index: 300;
  justify-content: space-between;
  transition: all 200ms;

  @media all and (max-width: 540px) {
    padding: 0;
    padding-left: 12px;
  }

  .header__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    div {
      div {
        cursor: pointer;
      }
    }
  }

  .header__login {
    margin-right: 15px;
    font-family: 'Noto Sans KR', serif;
  }
  @media all and (max-width: 540px) {
    font-size: 14px;
  }
`;

const NavBtn = styled.div`
  display: flex;
  align-items: center;
  button {
    font-size: 1em;
    margin-right: 1em;
  }
`;

interface Props {
  handleLogout: () => void;
  handleShowSider: () => void;
  showSider?: boolean;
}

const logoutFetcher = async (url: string) => {
  return await axios.post(url);
};

const AppHeader = ({ handleLogout, handleShowSider, showSider }: Props) => {
  const [scaleHeight, setScaleHeight] = useState(false);
  const [isUser, setIsUser] = useGlobalState('auth');

  const handleLogOut = useCallback(() => {
    logoutFetcher('/auth/logout');
    handleLogout();
    setIsUser({
      username: '',
      token: '',
      id: '',
      admin: false,
    });
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (window.scrollY > 75) {
        setScaleHeight(() => true);
      } else {
        setScaleHeight(() => false);
      }
    });

    return () => {
      document.removeEventListener('scoll', (_) => _);
    };
  }, []);

  return (
    <App scaleheight={scaleHeight.toString()}>
      <div className="header__container">
        <NavBtn>
          <Button type="text" size="large" onClick={handleShowSider}>
            {showSider ? <CloseOutlined /> : <MenuOutlined />}
          </Button>
          <Link href="/">
            <div>개발자의 생각창고</div>
          </Link>
        </NavBtn>
        <div className="header__login">
          {
            isUser?.id ? (
              <>
                <Link href="/upload">
                  <Button type="link" size="middle">
                    Upload
                  </Button>
                </Link>
                <Button type="link" size="middle" onClick={handleLogOut}>
                  Logout
                </Button>
              </>
            ) : null
            // (
            //   <Link href="/login">
            //     <Button type="link" size="middle">
            //       Login
            //     </Button>
            //   </Link>
            // )
          }
        </div>
      </div>
    </App>
  );
};

export default AppHeader;
