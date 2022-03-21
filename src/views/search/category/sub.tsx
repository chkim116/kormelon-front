import React from 'react';

import { PostListTemplate } from 'src/components/PostListTemplate';

import { useAppSelector } from 'src/store/config';

const SearchBySub = () => {
	const { postByQuery } = useAppSelector((state) => state.search);

	return (
		<div>
			<PostListTemplate posts={postByQuery} />
		</div>
	);
};

export default SearchBySub;
