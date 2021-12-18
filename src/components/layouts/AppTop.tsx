import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { ArrowUpOutlined } from '@ant-design/icons';

const Arrow = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  border-radius: 9999px;
  width: 45px;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.white};
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  opacity: 0.8;

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
