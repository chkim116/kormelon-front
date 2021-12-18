import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FaGithub } from 'react-icons/fa';
import { random } from 'kadvice';
import { AdviceType } from 'kadvice/dist/@types/type';

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
  const [randomAdvice, setRandomAdvice] = useState<AdviceType>();

  useEffect(() => {
    setRandomAdvice(random());
  }, []);

  return (
    <Container>
      <MeImg>
        <img src="https://assets-kormelon.s3.ap-northeast-2.amazonaws.com/img/asd.jpeg" alt="사진" />
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

      <div>
        <small>{randomAdvice?.message}</small>
        <div>
          <small>- {randomAdvice?.author} -</small>
        </div>
      </div>
    </Container>
  );
};

export default ContentMe;
