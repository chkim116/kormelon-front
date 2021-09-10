import styled from '@emotion/styled';
import { GiNightSleep } from 'react-icons/gi';
import React, { useCallback } from 'react';
import { useGlobalState } from '../../hooks';

const DarkModeBtnContainer = styled.div`
  position: fixed;
  bottom: calc(5% + 50px);
  right: 5%;
  border-radius: 9999px;
  width: 45px;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.black};
  text-align: center;
  line-height: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  svg {
    color: ${({ theme }) => theme.white};
    path {
    }
  }
`;

const AppDarkMode = () => {
  const [mode, setMode] = useGlobalState('mode');

  const handleModeChange = useCallback(() => {
    if (mode === 'light') {
      setMode('dark');
      localStorage.setItem('mode', JSON.stringify('dark'));
    } else {
      setMode('light');
      localStorage.setItem('mode', JSON.stringify('light'));
    }
  }, [mode, setMode]);

  return (
    <DarkModeBtnContainer onClick={handleModeChange}>
      <div>
        <GiNightSleep size={24} />
      </div>
    </DarkModeBtnContainer>
  );
};

export default AppDarkMode;
