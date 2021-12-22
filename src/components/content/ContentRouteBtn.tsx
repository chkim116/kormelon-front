import styled from '@emotion/styled';
import Link from 'next/link';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { PostItem } from '../../interfaces/post';

const ContentOtherPost = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 1em 0 2em 0;
  border-top: 2px solid ${({ theme }) => theme.border};
  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const PrevContent = styled.div`
  cursor: pointer;
  text-align: right;
  &:hover {
    opacity: 0.7;
  }
`;
const NextContent = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

interface Props {
  next: PostItem | null;
  prev: PostItem | null;
}

const ContentRouteBtn = ({ next, prev }: Props) => {
  return (
    <ContentOtherPost>
      <div style={{ padding: '0 0.6em' }}>
        <NextContent>
          {next && (
            <Link href={`/contents/${encodeURIComponent(next.title)}`}>
              <div>
                <FaArrowCircleLeft size={26} />
                <div>{decodeURIComponent(next.title)}</div>
              </div>
            </Link>
          )}
        </NextContent>

        <PrevContent>
          {prev && (
            <Link href={`/contents/${encodeURIComponent(prev.title)}`}>
              <div>
                <FaArrowCircleRight size={26} />
                <div>{decodeURIComponent(prev.title)}</div>
              </div>
            </Link>
          )}
        </PrevContent>
      </div>
    </ContentOtherPost>
  );
};

export default ContentRouteBtn;
