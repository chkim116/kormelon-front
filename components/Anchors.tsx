import styled from '@emotion/styled';
import { Anchor } from 'antd';
import { useMemo } from 'react';

const BookAnchor = styled(Anchor)`
  max-width: 200px;
  width: 100%;
  letter-spacing: -0.5px;
  padding: 0;
  opacity: 0;
  margin-bottom: 36px;
  position: fixed;
  top: 100px;
  padding: 0 1em;
  right: 0;
  background-color: ${({ theme }) => theme.white};
  .ant-anchor-ink::before {
    background-color: ${({ theme }) => theme.border};
  }
  @media all and (max-width: 760px) {
    display: none;
  }
`;

const AnchorBox = styled.div`
  font-size: 1em;
  color: ${(props) => props.theme.black};
`;

type Props = {
  anchor: string[];
};

const Anchors = ({ anchor }: Props) => {
  const a = useMemo(() => {
    const replace = (string: string) => string.replace(/<[^>]*>?/gm, '');
    return anchor.map((word) => replace(word));
  }, [anchor]);

  return (
    <>
      {a && (
        <BookAnchor className="anchor" affix={false}>
          {a.map((word) => (
            <AnchorBox key={word}>
              <Anchor.Link
                href={`#${word
                  // eslint-disable-next-line no-useless-escape
                  .replace(/[\!\@\#\$\%\^\&\*\(\)\_\+\?\.\,\_\=\~\`\/\*\-\+]+/g, '')
                  .replace(/ /g, '-')
                  .toLowerCase()}`}
                title={word}
              ></Anchor.Link>
            </AnchorBox>
          ))}
        </BookAnchor>
      )}
    </>
  );
};

export default Anchors;
