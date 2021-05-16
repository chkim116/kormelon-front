import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AppTitle, Post } from '..';
import ContentList from '../../components/ContentList';
import AppContents from '../../components/layouts/AppContents';
import AppLoading from '../../components/layouts/AppLoading';

const tagSearch = async (search: string) => {
  return await axios.get(`/tag/search?tag=${search}`);
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
      <AppTitle>{router.query.categories}에 대한 검색 결과</AppTitle>
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
