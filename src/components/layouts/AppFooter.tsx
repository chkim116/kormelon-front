import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';

const App = styled.footer`
  text-align: center;
  background-color: ${({ theme }) => theme.white};
  padding: 4em 0;
`;

const AppFooter = () => {
  const [view, setView] = useState({ views: 0, totalView: 0 });
  const [already, setAlready] = useState(false);

  useEffect(() => {
    if (already) {
      return;
    }

    const getViews = async () => {
      await axios.post('/view').then((res) => {
        setView({
          views: res.data.views,
          totalView: res.data.totalView,
        });
        setAlready(true);
      });
    };

    getViews();
  }, [already]);

  return (
    <App>
      <>
        <div>Kormelon &copy; 2021</div>
        <div>
          <small>
            Today <span>{view.views}</span>{' '}
            <span>
              Total <span>{view.totalView}</span>
            </span>
          </small>
        </div>
      </>
    </App>
  );
};

export default AppFooter;
