import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Post } from '..';
import ContentList from '../../components/ContentList';
import AppContents from '../../components/layouts/AppContents';
import AppLoading from '../../components/layouts/AppLoading';
import AppTitle from '../../components/layouts/AppTitle';

const tagSearch = async (search: string) => {
  return await axios.get(`/tag/search?select=title&text=${search}`);
};

const Search = () => {
  const router = useRouter();
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (router.query?.categories) {
      setIsLoading(() => true);
      tagSearch(router.query.categories as string)
        .then((res) => setPostList(res.data))
        .then(() => setIsLoading(() => false));
    }
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <AppTitle title={router.query?.categories as string} count={postList.length || null}></AppTitle>
      <AppContents>
        <>
          <ContentList postList={postList}></ContentList>
          {isLoading && <AppLoading scroll={true} />}
        </>
      </AppContents>
    </>
  );
};

export default Search;
