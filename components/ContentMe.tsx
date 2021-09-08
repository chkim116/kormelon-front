import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  text-align: center;

  hr {
    max-width: 100px;
    border: 1px solid ${({ theme }) => theme.border};
    margin: 3.5em auto;
  }

  h2 {
    margin-bottom: 1em;
  }
`;

const MeImg = styled.div`
  max-width: 350px;
  width: 100%;
  margin: 0 auto;
  img {
    width: 100%;
  }
`;

const ContentMe = () => {
  return (
    <Container>
      <MeImg>
        <img src="https://assets-kormelon.s3.ap-northeast-2.amazonaws.com/img/123.jpeg" alt="사진" />
      </MeImg>
      <hr />
      <h2>하고픈게 많은 별거 아닌 사람</h2>
      <h4>1996.01.23 B형</h4>

      <div>
        <h4>개발자</h4>
      </div>
    </Container>
  );
};

export default ContentMe;
