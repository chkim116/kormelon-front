import { title } from 'process';
import React, { useCallback, useState, useRef } from 'react';
import ToolbarComponent from './write/ToolbarComponent';
import Axios from 'axios';
import styled from '@emotion/styled';
import { addMark } from '../lib/toolbar';
import marked from 'marked';

const WriteContainer = styled.div`
  width: 100%;
  margin: 36px auto;
  padding: 0 3px;
  display: flex;
  justify-content: center;
`;

const EditorContainer = styled.div`
  min-height: 600px;
  width: 50%;
  border: 1px solid ${({ theme }) => theme.border};
  input {
    all: unset;
    font-size: 38px;
    font-weight: 600;
    width: 100%;
    padding: 8px 3px;
  }
  @media all and (max-width: ${(props) => props.theme.desktop}) {
    width: 100%;
    margin: 3px;
  }
`;

const Editor = styled.textarea`
  min-height: 600px;
  width: 100%;
  max-height: 990px;
  border: 1px solid ${(props) => props.theme.border};
  padding: 10px;
  resize: none;
  outline: none;
`;

const Preview = styled.div`
  overflow: auto;
  margin-left: 1px;
  width: 50%;
  max-height: 990px;
  min-height: 600px;
  border: 1px solid #dbdbdb;
  padding: 10px;
  ::-webkit-scrollbar {
    width: 5.2px;
  }
  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.white};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.gray};
    border-radius: 10px;
  }
  & > h1 {
    padding-bottom: 6px;
    margin-bottom: 6px;
    border-bottom: 1px solid ${(props) => props.theme.border};
    font-size: 38px;
  }

  img {
    display: block;
    max-width: 100%;
    margin: 30px auto;
  }
  @media all and (max-width: ${(props) => props.theme.desktop}) {
    display: none;
  }

  pre {
    margin: 8px 0;
  }
`;

export const ContentDetail = styled.div`
  width: 100%;
  min-height: 300px;
  font-size: 1.125rem;
  line-height: 1.7;
  word-break: keep-all;
  letter-spacing: -0.5px;
  overflow-wrap: break-word;
  h1 {
    position: relative;
    margin-top: 40px;
    padding-bottom: 12px;
    &:after {
      width: 30px;
      height: 1px;
      content: '';
      position: absolute;
      bottom: 0px;
      left: 0;
      border-bottom: 2px solid ${(props) => props.theme.border};
    }
  }

  blockquote {
    border-left: 2px solid ${(props) => props.theme.black};
    padding-left: 10px;
    font-size: 20px;
    font-weight: 500;
    margin: 5px 0;
  }

  pre {
    background-color: #fafbfc;
    overflow: auto;
    padding: 8px;
    margin: 8px 0;
  }

  a {
    &:hover {
      color: #1890ff;
    }
  }
  img {
    max-width: 100%;
    display: block;
    margin: 30px auto;
  }

  @media all and (max-width: ${({ theme }) => theme.desktop}) {
    font-size: 1rem;
  }
`;

type Props = {
  value?: string;
  title?: string;
};

const MarkEditor = ({ value, title }: Props) => {
  const [startText, setStartText] = useState<number>(0);
  const [endText, setEndText] = useState<number>(0);
  const [text, setText] = useState<string>(value || '');
  const editor = useRef<HTMLTextAreaElement>(null);

  // 에디터 입력시
  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const edit = editor.current as HTMLTextAreaElement;
    setStartText(edit.selectionStart);
    setEndText(edit.selectionEnd);
    setText(e.target.value);
  }, []);

  // 툴바버튼 클릭시 이벤트
  const onHeader = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { toolbar, lnline } = e.currentTarget.dataset;
      const newText = addMark(text, startText, endText, toolbar as string, lnline as string);
      const edit = editor.current;
      if (edit) {
        const end = endText;
        edit.setSelectionRange(0, end);
        edit.focus();
        setText(newText);
      }
    },
    [text, startText, endText, editor.current],
  );

  // 툴바가 이미지일시
  const onClickImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file: any = e.currentTarget.files;
      const formData = new FormData();
      formData.append('image', file[0]);

      // 이미지 api
      const postImg = async () => {
        const img = await Axios.post('/docs/img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((res) => res.data);
        setText(() => addMark(text, startText, endText, 'img', '', img));
      };
      postImg();
    },
    [text, startText, endText],
  );

  // 글자를 드래그했을 시 시작, 끝을 저장
  const onSelect = useCallback(() => {
    const edit = editor.current as HTMLTextAreaElement;
    setStartText(edit.selectionStart);
    setEndText(edit.selectionEnd);
  }, []);

  // 엔터키 이벤트
  const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      const edit = editor.current as HTMLTextAreaElement;
      setStartText(edit.selectionStart);
      setEndText(edit.selectionEnd);
    }
  }, []);

  // 상하좌우 키보드 이벤트
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
      const edit = editor.current as HTMLTextAreaElement;
      setStartText(edit.selectionStart ? edit.selectionStart - 1 : 0);
      setEndText(edit.selectionEnd);
    }
  }, []);

  // 제출 시 텍스트를 html로 파싱하여 제출합니다.
  //   const onSubmit = useCallback(() => {
  //     const submit = {
  //       title,
  //       description: desc,
  //       content: text,
  //       creator: user._id ? user._id : '',
  //       stack,
  //       secret,
  //     };
  //   }, [text, title]);

  return (
    <WriteContainer>
      <EditorContainer>
        <ToolbarComponent onHeader={onHeader} onClickImg={onClickImg} />
        <Editor
          id="editor"
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          ref={editor}
          value={text}
          onChange={onChange}
        ></Editor>
      </EditorContainer>

      <Preview className="editor__container">
        <h1>{title ? title : '문서 제목을 입력바랍니다.'}</h1>
        <ContentDetail
          dangerouslySetInnerHTML={{
            __html: marked(text),
          }}
        ></ContentDetail>
      </Preview>
    </WriteContainer>
  );
};

export default MarkEditor;
