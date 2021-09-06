import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';

const Toolbar = styled.div`
  width: 100%;
  display: flex;
  border: none;
  position: sticky;
  top: 0;
  z-index: 55;
  flex-wrap: wrap;
  background-color: ${(props) => props.theme.white};

  button {
    flex: 1;
    line-height: 100%;
    padding: 10px;
    height: 100%;
    font-weight: 700;
    font-size: 0.95rem;
  }
`;

type Props = {
  // eslint-disable-next-line no-unused-vars
  onHeader: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // eslint-disable-next-line no-unused-vars
  onClickImg: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ToolbarComponent = ({ onHeader, onClickImg }: Props) => {
  const imgInput = useRef<HTMLInputElement>(null!);
  const onHideInput = () => {
    imgInput.current.click();
  };

  return (
    <Toolbar>
      <Button type="default" data-toolbar="#" onClick={onHeader}>
        h1
      </Button>
      <Button type="default" data-toolbar="##" onClick={onHeader}>
        h2
      </Button>
      <Button type="default" data-toolbar="###" onClick={onHeader}>
        h3
      </Button>
      <Button type="default" data-toolbar="####" onClick={onHeader}>
        h4
      </Button>

      <Button type="default" data-toolbar="**" data-lnline="true" onClick={onHeader}>
        <strong>굵게</strong>
      </Button>
      <Button type="default" data-toolbar="_" data-lnline="true" onClick={onHeader}>
        <i>I</i>
      </Button>
      <Button type="default" data-toolbar="```" onClick={onHeader}>
        Code
      </Button>

      <Button type="default" data-toolbar="---" onClick={onHeader}>
        hr
      </Button>
      <Button type="default" data-toolbar=">" onClick={onHeader}>
        qut
      </Button>
      <Button type="default" data-toolbar="-" onClick={onHeader}>
        lst
      </Button>
      <Button type="default" data-toolbar="[]()" onClick={onHeader}>
        link
      </Button>
      <Button type="default" onClick={onHideInput}>
        img
      </Button>
      <input type="file" accept="image/*" hidden ref={imgInput} onChange={onClickImg}></input>
    </Toolbar>
  );
};

export default ToolbarComponent;
