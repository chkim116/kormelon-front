import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import ContentForm from '../../components/layouts/ContentForm';
import { Button, Modal, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import AppContents from '../../components/layouts/AppContents';
import axios from 'axios';
import { Categories } from '../[categories]';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Post } from '..';
import { getCate, postDeleteFetcher } from '../../fetch';
import { useRouter } from 'next/router';
import AppLoading from '../../components/layouts/AppLoading';
import AppEmpty from '../../components/layouts/AppEmpty';
import { useScrollTop } from '../../hooks';
import marked from 'marked';
import '../../lib/highlight';
import Anchors from '../../components/Anchors';
import SEO from '../../seo';
import Link from 'next/link';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { useAppSelector } from '../../store/hook';

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
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    padding: 0 0.2em;
    object-fit: contain;
    width: 100%;
    height: 100%;
    max-height: 500px;
  }
`;

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

type PostItem = {
  id: string;
  title: string;
};

interface Props {
  post: Post;
  anchor: string[];
  prev: PostItem | null;
  next: PostItem | null;
}

const Contents = ({ post, anchor, prev, next }: Props) => {
  const {
    asider: { isShowAsider },
    auth: { user },
  } = useAppSelector((state) => state);

  const [categories, setCategories] = useState<Categories[]>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const thumbRef = useRef<HTMLDivElement>(null);
  const handleEdit = useCallback(() => {
    router.push(`/upload?title=${encodeURIComponent(post?.title)}&edit=true`);
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

    if (isShowAsider) {
      getCate().then((res) => setCategories(res.data));
    }
  }, [categories, isShowAsider]);

  useEffect(() => {
    document.addEventListener('scroll', handleOpacityAnchor);
    return () => {
      document.removeEventListener('scroll', handleOpacityAnchor);
    };
  }, [handleOpacityAnchor]);

  useScrollTop();

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
          {user.admin && (
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
      </>
    </>
  );
};

export default Contents;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { params, req } = ctx;
  const cookie = req.headers.cookie || '';

  const fetch = await axios
    .get(`/post/${encodeURIComponent(params?.title as string)} `, {
      withCredentials: true,
      headers: {
        Cookie: cookie,
      },
    })
    .then((res) => res.data);
  const html = await marked(fetch.postByTitle.description);

  const post = { ...fetch.postByTitle, description: html };
  const next = fetch.next;
  const prev = fetch.prev;

  const reg =
    // eslint-disable-next-line no-useless-escape
    /<([h][1])[^>]*>[ㄱ-ㅎ\ㅏ-ㅣ\가-힣\w\s\.\!\@\#\$\%\^\&\*\(\)\-\=\+\_\?\,\;\"\'\|\/\~\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff]+<\/\h1>/g;

  const anchor = html.match(reg) || [];

  return { props: { post, anchor, next, prev } };
};
