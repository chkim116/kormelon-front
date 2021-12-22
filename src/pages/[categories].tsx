import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import SEO from '../assets/seo';
import { Post } from '../interfaces/post';
import CategoriesContent from '../components/home/categories';

interface Props {
  post: Post[];
  postCount: number;
}

const Category = ({ post, postCount }: Props) => {
  const router = useRouter();
  return (
    <>
      <SEO desc={`${router.query.categories}에 대한 포스트`} />
      <CategoriesContent post={post} postCount={postCount} />
    </>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { params, query } = ctx;

  const filterUrl = `/post?filter=${encodeURIComponent(params?.categories as string)}`;
  const pageUrl = `/post?filter=${encodeURIComponent(params?.categories as string)}&page=${query.page}`;
  const isPage = query?.page;

  const post: Props = await axios.get(isPage ? pageUrl : filterUrl).then((res) => res.data);

  return {
    props: { post: post.post, postCount: post.postCount },
  };
};
