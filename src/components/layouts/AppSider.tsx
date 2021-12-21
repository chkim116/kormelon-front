import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Sider from 'antd/lib/layout/Sider';
import Link from 'next/link';
import { Categories } from '../../pages/[categories]';
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Input, Modal, notification } from 'antd';
import { delCategory, postCategory } from '../../fetch';
import axios from 'axios';
import { useAppSelector } from '../../store/hook';

const App = styled(Sider)<{ show: boolean }>`
  ${({ show, theme }) =>
    show
      ? css`
          position: fixed;
          left: 0;
          top: 53px;
          width: 100px;
          height: 100vh;
          background-color: ${theme.white};
          padding: 1em;
          ul {
            li {
              color: ${theme.black};
              cursor: pointer;
              font-size: 16px;
              line-height: 32px;
              list-style: none;
              @media all and (max-width: 540px) {
                font-size: 14px !important;
                line-height: 30px;
              }
              &:hover {
                text-decoration: underline;
              }
            }
          }
        `
      : css`
          display: none;
        `}

  @media all and (max-width: 540px) {
    ${({ show }) =>
      show
        ? css`
            display: block;
            position: fixed;
            left: 0;
            top: 53px;
          `
        : css`
            display: none;
          `};
  }
`;

const ContentEditBtn = styled.div`
  margin-left: auto;
  width: 120px;
`;

const getAllLength = (category: Categories[]): number => {
  let res = 0;
  category.reduce((prev: number, cur: Categories) => {
    return (res = prev + cur.post.length);
  }, 0);

  return res;
};

const AppSider = () => {
  const {
    asider: { isShowAsider },
    auth,
  } = useAppSelector((state) => state);

  const [allPost, setAllPost] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [add, setAdd] = useState(false);
  const [categoryList, setCategoryList] = useState<Categories[]>([]);
  const [delCategories, setDelCategories] = useState(false);
  const handleShowingAdd = useCallback(() => {
    setAdd((prev) => !prev);
  }, []);

  const handleAddCategory = useCallback(() => {
    if (!categoryName) {
      return notification.error({
        message: '제대로 입력해 주세요',
        placement: 'bottomLeft',
      });
    }
    postCategory(`/category/create`, { category: categoryName });

    notification.info({
      message: `${categoryName}가 생성되었습니다.`,
      placement: 'bottomLeft',
    });
    setCategoryList((prev) => [...prev, { category: categoryName, post: [] }]);
    setCategoryName(() => '');
    setAdd((prev) => !prev);
  }, [categoryName]);

  const handleChangeCategory = useCallback((e: any) => {
    setCategoryName(() => e.target.value);
  }, []);

  const handleSelectForDel = useCallback((e: any) => {
    const { id, cate } = e.currentTarget.dataset;
    Modal.confirm({
      title: '삭제 여부',
      content: `${cate} 삭제 하십니까?`,
      onOk: () => {
        delCategory(`/category/del/${id}`);
        notification.success({
          message: `${cate} 제거 성공`,
        });
        setCategoryList((prev) => prev.filter((lst) => lst._id !== id));
      },
    });
  }, []);

  const handleDelete = useCallback(() => {
    setDelCategories((prev) => !prev);
  }, []);

  useEffect(() => {
    (async () =>
      await axios.get('/category').then((res) => {
        setCategoryList(res.data);
        setAllPost(getAllLength(res.data));
      }))();
  }, []);

  const CategoryLists = ({ categoryList }: { categoryList: Categories[] }) => {
    return (
      <>
        {categoryList.map((list) => (
          <div key={list._id}>
            {delCategories ? (
              <li>
                <DeleteOutlined
                  data-id={list._id}
                  data-cate={list.category}
                  onClick={handleSelectForDel}
                  style={{
                    marginRight: '3px',
                    color: 'red',
                  }}
                ></DeleteOutlined>
                {list.category} ({list.post.length})
              </li>
            ) : (
              <Link href={`/${list.category}`} key={list._id}>
                <li>
                  {list.category} ({list.post.length})
                </li>
              </Link>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <App show={isShowAsider}>
        <ul>
          <Link href="/">
            <li>All ({allPost})</li>
          </Link>
          <CategoryLists categoryList={categoryList} />
        </ul>
        {add && (
          <div style={{ display: 'flex' }}>
            <Input onChange={handleChangeCategory} placeholder="새로 추가할 카테고리 입력" />
            <Button type="primary" onClick={handleAddCategory}>
              확인
            </Button>
          </div>
        )}
        {auth.admin && (
          <ContentEditBtn>
            <Button type="link" size="middle" onClick={handleShowingAdd}>
              <FileAddOutlined />
            </Button>
            <Button type="link" size="middle" onClick={handleDelete}>
              <DeleteOutlined />
            </Button>
          </ContentEditBtn>
        )}
      </App>
    </>
  );
};

export default AppSider;
