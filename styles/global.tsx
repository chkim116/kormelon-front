import { css, Global } from '@emotion/react';
import '../node_modules/antd/dist/antd.css';

export const GlobalStyles = ({ theme }: any) => {
  return (
    <Global
      styles={css`
        body {
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          font-family: 'Noto Sans KR', Sans-serif, -apple-system;
          font-size: 14px;
          font-weight: 400;
          color: ${theme.black};
          line-height: 1.55em;
          letter-spacing: -0.02em;
          word-break: keep-all;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .header__container {
          font-family: 'Nanum Myeongjo';
        }

        #content {
          width: 100%;
          min-height: 300px;
          overflow-wrap: break-word;
          font-size: 0.91rem;
          font-family: 'Noto Sans KR';
          font-weight: 300;
          color: ${theme.black};
          line-height: 1.55em;
          letter-spacing: -0.02em;
          word-break: keep-all;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .content-title {
          margin-top: 0.9em;
          margin-bottom: 0.6em;
          padding-bottom: 0.9em;
          border-bottom: 1px dashed #dbdbdc;
          font-family: 'Nanum Myeongjo';
          font-size: 2rem;
          line-height: 2rem;
        }

        #content h1 {
          position: relative;
          font-size: 1.5rem;
          margin: 1em 0;
          font-family: 'Nanum Myeongjo';
        }

        #content blockquote {
          border-left: 2px solid ${theme.black};
          padding-left: 10px;
          font-size: 1.1rem;
          font-weight: 400;
          margin: 5px 0;
        }

        #content a:hover {
          color: #1890ff;
        }

        #content pre {
          font-family: 'Fira Code', monospace;
          letter-spacing: -0.06em;
        }

        #content hr {
          margin: 3.5em auto;
          text-align: center;
          width: 10rem;
          border: 1px solid ${theme.border};
        }

        #content img {
          max-width: 100%;
          display: block;
          margin: 30px auto;
          max-height: 500px;
          object-fit: contain;
        }

        h2,
        h3,
        h4 {
          font-family: 'Nanum Myeongjo';
          margin: 0;
          padding: 0;
        }

        content p {
          margin: 0;
          padding: 0;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        p {
          color: ${theme.black};
        }

        div,
        span,
        small,
        li,
        ol,
        ul {
          color: ${theme.black};
        }

        ul,
        ol {
          padding-left: 2em;
          font-size: 15px;
        }
      `}
    />
  );
};
