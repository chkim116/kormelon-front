import React, { useCallback, useState, useRef, useEffect } from 'react';
import ToolbarComponent from './write/ToolbarComponent';
import Axios from 'axios';
import styled from '@emotion/styled';
import { addMark } from '../lib/toolbar';
import marked from 'marked';
import { highlights } from '../lib/highlight';

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
  prevDesc?: string;
  title?: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
};

const MarkEditor = ({ prevDesc, title, setDesc }: Props) => {
  const [startText, setStartText] = useState<number>(0);
  const [endText, setEndText] = useState<number>(0);
  const [txt, setTxt] = useState('');
  const [range, setRange] = useState({ selStart: 0, selEnd: 0 });
  const editor = useRef<HTMLTextAreaElement>(null);

  // 에디터 입력시
  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const edit = editor.current as HTMLTextAreaElement;
    setStartText(edit.selectionStart);
    setEndText(edit.selectionEnd);
    setTxt(e.target.value);
  }, []);

  // 툴바버튼 클릭시 이벤트
  const onHeader = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { toolbar, lnline } = e.currentTarget.dataset;
      const newText = addMark(txt, startText, endText, toolbar as string, lnline as string);
      const edit = editor.current;

      if (edit) {
        const len = toolbar?.length || 0;
        setTxt(newText);
        if (toolbar === '```') {
          setRange({ selStart: startText + len + 'js'.length + 1, selEnd: startText + len + 'js'.length + 1 });
          return;
        }
        if (toolbar === '**') {
          setRange({ selStart: startText + len, selEnd: startText + len });
          return;
        }
        if (toolbar === '_') {
          setRange({ selStart: startText + len, selEnd: startText + len });
          return;
        }
        if (toolbar === '[]()') {
          setRange({ selStart: startText + len - 1, selEnd: startText + len - 1 });
          return;
        }
        setRange({ selStart: endText + len + 1, selEnd: endText + len + 1 });
      }
    },
    [txt, startText, endText, editor.current],
  );

  // 툴바가 이미지일시
  const onClickImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file: any = e.currentTarget.files;
      const formData = new FormData();
      formData.append('image', file[0]);

      // 이미지 api
      const postImg = async () => {
        const img = await Axios.post('/post/img', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((res) => res.data);
        setTxt(() => addMark(txt, startText, endText, 'img', '', img));
      };
      postImg();
    },
    [txt, startText, endText],
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
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const edit = editor.current as HTMLTextAreaElement;
      if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        setStartText(edit.selectionStart ? edit.selectionStart - 1 : 0);
        setEndText(edit.selectionEnd);
      }

      //   https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea

      // Tab key?
      if (e.keyCode === 9) {
        e.preventDefault();
        // selection?
        if (edit.selectionStart == edit.selectionEnd) {
          // These single character operations are undoable
          if (!e.shiftKey) {
            document.execCommand('insertText', false, '\t');
          } else {
            const text = edit.value;
            if (edit.selectionStart > 0 && text[edit.selectionStart - 1] == '\t') {
              document.execCommand('delete');
            }
          }
        } else {
          // Block indent/unindent trashes undo stack.
          // Select whole lines
          let selStart = edit.selectionStart;
          let selEnd = edit.selectionEnd;
          const text = edit.value;
          while (selStart > 0 && text[selStart - 1] !== '\n') selStart--;
          while (selEnd > 0 && text[selEnd - 1] !== '\n' && selEnd < text.length) selEnd++;

          // Get selected text
          let lines = text.substr(selStart, selEnd - selStart).split('\n');

          // Insert tabs
          for (let i = 0; i < lines.length; i++) {
            // Don't indent last line if cursor at start of line
            if (i == lines.length - 1 && lines[i].length === 0) continue;

            // Tab or Shift+Tab?
            if (e.shiftKey) {
              if (lines[i].startsWith('\t')) lines[i] = lines[i].substr(1);
              else if (lines[i].startsWith('    ')) lines[i] = lines[i].substr(4);
            } else lines[i] = '\t' + lines[i];
          }

          const line = lines.join('\n');
          // Update the text area
          setTxt(text.substr(0, selStart) + line + text.substr(selEnd));
          setRange({ selStart, selEnd: selStart + line.length });
        }
        return false;
      }
    },
    [txt],
  );

  useEffect(() => {
    const edit = editor.current;
    if (!edit) return;
    const { selStart, selEnd } = range;
    edit.setSelectionRange(selStart, selEnd);
    edit.focus();
  }, [range]);

  useEffect(() => {
    setDesc(txt);
    const nodes = document.querySelectorAll('pre');
    highlights(nodes);
  }, [txt]);

  return (
    <WriteContainer>
      <EditorContainer>
        <ToolbarComponent onHeader={onHeader} onClickImg={onClickImg} />
        <Editor
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onSelect={onSelect}
          ref={editor}
          value={txt || prevDesc}
          onChange={onChange}
          spellCheck={false}
        ></Editor>
      </EditorContainer>

      <Preview>
        <h1>{title ? title : '문서 제목을 입력바랍니다.'}</h1>
        <ContentDetail
          dangerouslySetInnerHTML={{
            __html: marked(txt || prevDesc || ''),
          }}
        ></ContentDetail>
      </Preview>
    </WriteContainer>
  );
};

export default MarkEditor;
