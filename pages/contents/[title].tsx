import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ContentForm from '../../components/layouts/ContentForm';
import { Button, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AppContents from '../../components/layouts/AppContents';
import axios from 'axios';
import { Categories } from '../[categories]';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Post } from '..';
import { AppContext } from '../_app';
import { getCate, postDeleteFetcher } from '../../fetch';
import { useRouter } from 'next/router';
import AppLoading from '../../components/layouts/AppLoading';
import AppEmpty from '../../components/layouts/AppEmpty';
import { useGlobalState } from '../../hooks';
import marked from 'marked';
import '../../lib/highlight';
import Anchors from '../../components/Anchors';
import SEO from '../../seo';

const Content = styled.section`
  width: 100%;
`;

const ContentEditBtn = styled.div`
  margin-left: auto;
  width: 120px;
`;

const ContentThumb = styled.div<{ url: string }>`
  background-attachment: fixed;
  position: relative;
  top: 75px;
  max-height: 500px;
  height: 100%;
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    height: 100%;
    max-height: 500px;
  }
`;

interface Props {
  post: Post;
  anchor: string[];
}

const Contents = ({ post, anchor }: Props) => {
  const [categories, setCategories] = useState<Categories[]>();
  const [loading, setLoading] = useState(false);
  const { showSider } = useContext(AppContext);
  const [user] = useGlobalState('auth');
  const router = useRouter();
  const thumbRef = useRef<HTMLDivElement>(null);
  const handleEdit = useCallback(() => {
    router.push(`/upload?title=${post?.title}&edit=true`);
  }, [post, router]);

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: '삭제여부',
      content: '게시글을 삭제합니다?',
      onOk: () =>
        postDeleteFetcher(post._id, post.category).then(() => {
          setLoading(() => true);
          notification.success({
            message: '삭제는 됐습니다!',
            placement: 'bottomLeft',
          });
          router.push(`/${post.category}`);
        }),
    });
  }, [post, router]);

  const handleOpacityAnchor = useCallback(() => {
    const thumbEl = thumbRef.current;
    if (thumbEl) {
      const height = thumbEl.clientHeight;
      const opa = 1 - (height - scrollY) / height;
      const anchor = document.querySelector('.anchor') as HTMLDivElement;
      if (anchor) {
        anchor.style.opacity = `${opa}`;
      }
    }
  }, []);

  useEffect(() => {
    if (categories) {
      return;
    }

    if (showSider) {
      getCate().then((res) => setCategories(res.data));
    }
  }, [showSider]);

  useEffect(() => {
    document.addEventListener('scroll', handleOpacityAnchor);
    return () => {
      document.removeEventListener('scroll', handleOpacityAnchor);
    };
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  if (router.isFallback) {
    return <AppLoading text={true} />;
  }

  if (!post) {
    return <AppEmpty />;
  }

  const replace = (string: string) => string.replace(/<[^>]*>?/gm, '');
  return (
    <>
      <SEO
        title={post.title}
        desc={`${post.preview} | ${replace(post.description).replace(/\n/gi, ' ').slice(0, 180)}`}
        image={post.thumb}
        url={`https://www.kormelon.com/contents/${post.title}`}
      />
      <>
        <Content>
          <ContentThumb url={post.thumb} ref={thumbRef}>
            <img src={post.thumb} alt="썸네일 이미지" />
          </ContentThumb>
          {user?.admin && (
            <ContentEditBtn>
              <Button type="link" size="large" onClick={handleEdit}>
                <EditOutlined />
              </Button>
              <Button type="link" size="large" onClick={handleDelete}>
                <DeleteOutlined />
              </Button>
            </ContentEditBtn>
          )}
          <AppContents>
            <ContentForm tags={post.tags} date={post.createDate} title={post.title} p={post.description} />
          </AppContents>
          <Anchors anchor={anchor} />
        </Content>
      </>
    </>
  );
};

export default Contents;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { params } = ctx;

  const fetch = await axios.get(`/post/${encodeURIComponent(params?.title as string)}`).then((res) => res.data);
  const html = marked(fetch.description);

  const post = { ...fetch, description: html };
  // eslint-disable-next-line no-useless-escape
  const reg = /<([h][1])[^>]*>[ㄱ-ㅎ\ㅏ-ㅣ\가-힣\w\s\.\!\@\#\$\%\^\&\*\(\)\-\=\+\_\?\,\;\"\'\|\/\~']+<\/\1>/g;
  const anchor = html.match(reg) || [];
  return { props: { post, anchor } };
};
