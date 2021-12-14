import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { useGlobalState } from '../../hooks';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';

const Sider = styled.div`
  div {
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
  }

  button {
    position: absolute;
    left: 1em;
    top: 1em;
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
  const categories = ['book', 'algorithm', 'tech', 'development', 'essay', 'me'];
  const collapsed = useSpring({
    from: {
      width: 0,
    },
    to: {
      width: 200,
    },
    config: {
      duration: 100,
    },
  });

  const handleIsShowSider = useCallback(() => {
    setIsShowSider(false);
  }, [setIsShowSider]);

  return (
    <Sider>
      <animated.div style={collapsed}>
        <Button type="text" onClick={handleIsShowSider}>
          X
        </Button>
        <ul>
          {categories.map((lst) => (
            <Link href={`/${lst}`} key={lst}>
              <li> {lst.toUpperCase()}</li>
            </Link>
          ))}
        </ul>
      </animated.div>
    </Sider>
  );
};

export default AppCategories;
