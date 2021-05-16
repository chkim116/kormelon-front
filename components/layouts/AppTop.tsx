import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { ArrowUpOutlined } from '@ant-design/icons';

const Arrow = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  border: 1px solid #dbdbdb;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }
`;

const AppTop = () => {
  const handleScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Arrow onClick={handleScroll}>
      <ArrowUpOutlined style={{ fontSize: '20px' }} />
    </Arrow>
  );
};

export default AppTop;
