import styled from '@emotion/styled';
import { GiNightSleep } from 'react-icons/gi';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setDarkMode } from '../../store/reducer/darkmode';
import { theme } from '../../styles/theme';
import { ThemeProvider } from '@emotion/react';
import { GlobalStyles } from '../../styles/global';

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

interface Props {
  children: React.ReactNode;
}

const AppDarkMode = ({ children }: Props) => {
  const { mode } = useAppSelector((state) => state.darkMode);
  const dispatch = useAppDispatch();

  const modeTheme = useMemo(() => {
    if (mode === 'dark') {
      return { ...theme, white: theme.black, black: theme.white };
    } else {
      return { ...theme, white: theme.white, black: theme.black };
    }
  }, [mode]);

  const handleToggleDarkMode = useCallback(() => {
    if (mode === 'white') {
      dispatch(setDarkMode('dark'));
      localStorage.setItem('mode', JSON.stringify('dark'));
    } else {
      dispatch(setDarkMode('white'));
      localStorage.setItem('mode', JSON.stringify('white'));
    }
  }, [mode, dispatch, setDarkMode]);

  // 기본 dark mode
  useEffect(() => {
    if (typeof window === 'object') {
      const modeOption = JSON.parse(localStorage.getItem('mode') || JSON.stringify('dark'));
      if (modeOption) {
        dispatch(setDarkMode(modeOption));
      }
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={modeTheme}>
        <GlobalStyles theme={modeTheme} />
        <>{children}</>
        <DarkModeBtnContainer onClick={handleToggleDarkMode}>
          <div>
            <GiNightSleep size={24} />
          </div>
        </DarkModeBtnContainer>
      </ThemeProvider>
    </>
  );
};

export default AppDarkMode;
