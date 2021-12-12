import React from 'react';
import styled from '@emotion/styled';
import { FaGithub } from 'react-icons/fa';

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
      <h2>
        <a href="https://github.com/chkim116">
          <FaGithub size={30} />
        </a>
      </h2>

      <div>
        <h4>FrontEnd Developer</h4>
      </div>
    </Container>
  );
};

export default ContentMe;
