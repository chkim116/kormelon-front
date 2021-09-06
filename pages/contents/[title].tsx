import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ContentForm from '../../components/layouts/ContentForm';
import { Button, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AppContents from '../../components/layouts/AppContents';
import AppSider from '../../components/layouts/AppSider';
import axios from 'axios';
import { Categories } from '../[categories]';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Post } from '..';
import { AppContext } from '../_app';
import { getCate, postDeleteFetcher } from '../../fetch';
import { useRouter } from 'next/router';
import AppLoading from '../../components/layouts/AppLoading';
import AppEmpty from '../../components/layouts/AppEmpty';
import { NextSeo } from 'next-seo';
import { useGlobalState } from '../../hooks';
import marked from 'marked';
import { highlights } from '../../lib/highlight';
import Anchors from '../../components/Anchors';

const Content = styled.section`
  width: 100%;
`;

const ContentEditBtn = styled.div`
  margin-left: auto;
  width: 120px;
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

  useEffect(() => {
    if (categories) {
      return;
    }

    if (showSider) {
      getCate().then((res) => setCategories(res.data));
    }
  }, [showSider]);

  useEffect(() => {
    const nodes = document.querySelectorAll('pre');
    if (nodes) {
      highlights(nodes);
    }
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

  // TODO: 에딧, 삭제 등은 고유 아이디로 이동~
  return (
    <>
      <NextSeo
        title={`${post.title}`}
        description={`${post.preview}`}
        canonical="https://www.kormelon.com/"
        openGraph={{
          title: `${post.title}`,
          description: `${post.preview}`,
          type: 'article',
          locale: 'ko_KR',
          url: `https://www.kormelon.com/contents/${post.title}`,
          site_name: '생각창고',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <AppContents>
        <>
          <Content>
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
            <ContentForm tags={post.tags} date={post.createDate} title={post.title} p={post.description} />
          </Content>
          {categories && showSider && <AppSider categories={categories} />}
          <Anchors anchor={anchor} />
        </>
      </AppContents>
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
