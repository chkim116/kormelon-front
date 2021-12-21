import { Modal, Button } from 'antd';
import axios from 'axios';
import router from 'next/router';
import { useCallback } from 'react';
import { useNotification } from '../../hooks/useNotification';
import { Post } from '../../interfaces/post';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const ContentEditBtn = styled.div`
  margin-left: auto;
  width: 120px;
`;

interface Props {
  post: Post;
}

const postDeleteFetcher = async (id: string, category: string) => {
  await axios.get(`/post/del/${id}/${category}`);
};

const ContentEditable = ({ post }: Props) => {
  const { showNotification } = useNotification();

  const handleEdit = useCallback(() => {
    router.push(`/upload?title=${encodeURIComponent(post?.title)}&edit=true`);
  }, [post, router]);

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: '삭제여부',
      content: '게시글을 삭제합니다?',
      onOk: () =>
        postDeleteFetcher(post._id, post.category).then(() => {
          showNotification({ message: '삭제 됐습니다.' });
          router.push(`/${post.category}`);
        }),
    });
  }, [post, router]);

  return (
    <>
      <ContentEditBtn>
        <Button type="link" size="large" onClick={handleEdit}>
          <EditOutlined />
        </Button>
        <Button type="link" size="large" onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      </ContentEditBtn>
    </>
  );
};

export default ContentEditable;
