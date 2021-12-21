import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import axios from 'axios';
import Home from '../components/home';

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { query } = ctx;
  const pageUrl = `/post?page=${query.page}`;
  const isPage = query.page;

  const post = await axios.get(isPage ? pageUrl : '/post').then((res) => res.data);
  return {
    props: {
      post: post.post,
      postCount: post.postCount,
    },
  };
};
