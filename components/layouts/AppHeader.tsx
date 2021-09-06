import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Header } from 'antd/lib/layout/layout';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import axios from 'axios';
import { useGlobalState } from '../../hooks';
import AppCategories from './AppCategories';

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
    align-items: center;
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

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  margin-left: 1.5em;
  flex: 1;
  justify-content: right;
  font-family: 'Noto Sans KR';

  @media all and (max-width: 768px) {
    ul,
    li {
      display: none;
    }
  }
  li {
    cursor: pointer;
    font-size: 0.85rem;
    margin-right: 2em;
    list-style: none;
    position: relative;
    &:hover {
      &::after {
        position: absolute;
        width: 100%;
        height: 1px;
        bottom: 5px;
        left: 0;
        content: '';
        background-color: ${({ theme }) => theme.black};
      }
    }
  }
`;

const MobileNav = styled(Button)`
  @media all and (min-width: 768px) {
    display: none;
  }
`;

interface Props {
  handleLogout: () => void;
  // eslint-disable-next-line no-unused-vars
  handleShowSider: (e: any) => void;
}

const logoutFetcher = async (url: string) => {
  return await axios.post(url);
};

const AppHeader = ({ handleLogout, handleShowSider }: Props) => {
  const [scaleHeight, setScaleHeight] = useState(false);
  const [isUser, setIsUser] = useGlobalState('auth');
  const [isShowSider] = useGlobalState('isShowSider');

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
          {/* <Button type="text" size="large" onClick={handleShowSider}>
            {showSider ? <CloseOutlined /> : <MenuOutlined />}
          </Button> */}
          <Link href="/">
            <div>김개발 블로그</div>
          </Link>
        </NavBtn>
        <NavMenu>
          <Link href={`/tech`}>
            <li>TECH</li>
          </Link>
          <Link href="/development">
            <li>DEVELOPMENT</li>
          </Link>
          <Link href="/lifestyle">
            <li>LIFESTYLE</li>
          </Link>
          <Link href="me">
            <li>ME</li>
          </Link>
        </NavMenu>
        <MobileNav type="text" size="large" onClick={handleShowSider}>
          {isShowSider ? <CloseOutlined /> : <MenuOutlined />}
        </MobileNav>
        {isShowSider && <AppCategories />}
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
