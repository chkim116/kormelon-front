import React from 'react';
import styled from '@emotion/styled';
import { FaBlogger, FaGithub } from 'react-icons/fa';

const Container = styled.div`
  text-align: center;

  hr {
    max-width: 100px;
    border: 1px solid ${({ theme }) => theme.border};
    margin: 3.5em auto;
  }
`;

const MeLink = styled.div`
  margin-bottom: 1em;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 0.5em;
`;

const MeImg = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    max-height: 350px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ContentMe = () => {
  return (
    <Container>
      <MeImg>
        <img src="https://assets-kormelon.s3.ap-northeast-2.amazonaws.com/img/asd.jpeg" alt="사진" />
      </MeImg>
      <hr />

      <MeLink>
        <a target="_blank" href="https://github.com/chkim116">
          <FaGithub size={30} />
        </a>
        <a target="_blank" href="https://portfolio.kormelon.com">
          <FaBlogger size={30} />
        </a>
      </MeLink>

      <div>
        <h4>FrontEnd Developer</h4>
      </div>
    </Container>
  );
};

export default ContentMe;
