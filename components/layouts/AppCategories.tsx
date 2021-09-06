import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { useGlobalState } from '../../hooks';
import Link from 'next/link';

const Sider = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  width: 200px;
  height: 100vh;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0.6px 0.8px 2px ${({ theme }) => theme.black};

  button {
    position: absolute;
    left: 1em;
    top: 1em;
  }
  p {
    margin: 0;
  }

  ul {
    text-align: center;
  }

  li {
    cursor: pointer;
    margin-bottom: 0.3em;
    &:hover {
      text-decoration: underline;
    }
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
    cursor: pointer;
  }
`;

const AppCategories = () => {
  const [, setIsShowSider] = useGlobalState('isShowSider');
  const categories = ['tech', 'development', 'lifestyle', 'me'];

  const handleIsShowSider = useCallback(() => {
    setIsShowSider(false);
  }, [setIsShowSider]);

  return (
    <Sider>
      <Button type="text" onClick={handleIsShowSider}>
        X
      </Button>
      <p>김개발 블로그</p>
      <small>-</small>
      <ul>
        {categories.map((lst) => (
          <Link href={`/${lst}`} key={lst}>
            <li>{lst.toUpperCase()}</li>
          </Link>
        ))}
      </ul>
    </Sider>
  );
};

export default AppCategories;
