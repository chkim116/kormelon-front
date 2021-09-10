import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Post } from '..';
import ContentList from '../../components/ContentList';
import AppContents from '../../components/layouts/AppContents';
import AppLoading from '../../components/layouts/AppLoading';
import AppTitle from '../../components/layouts/AppTitle';

const tagSearch = async (select: string, text: string) => {
  return await axios.get(`/tag/search?select=${select}&text=${text}`);
};

const Search = () => {
  const { query } = useRouter();
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query?.select && query?.text) {
      setIsLoading(() => true);
      tagSearch(query.select as string, query.text as string)
        .then((res) => setPostList(res.data))
        .then(() => setIsLoading(() => false));
    }
  }, [query]);

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <>
      <AppTitle title={(query?.text as string) || ''} count={postList.length || null}></AppTitle>
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
