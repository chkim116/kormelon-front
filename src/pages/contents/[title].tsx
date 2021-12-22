import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import AppLoading from '../../components/layouts/AppLoading';
import AppEmpty from '../../components/home/common/ContentEmpty';
import marked from 'marked';
import '../../lib/highlight';
import SEO from '../../assets/seo';
import { Post, PostItem } from '../../interfaces/post';
import ContentByTitle from '../../components/content';

interface Props {
  post: Post;
  anchor: string[];
  prev: PostItem | null;
  next: PostItem | null;
}

const Contents = ({ post, anchor, prev, next }: Props) => {
  const router = useRouter();

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
      <ContentByTitle post={post} anchor={anchor} prev={prev} next={next} />
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
