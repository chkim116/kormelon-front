import { useEffect } from 'react';
import Tag from 'src/components/Tag';

import { useAppDispatch, useAppSelector } from 'src/store/config';
import { getTags } from 'src/store/tag';
import AllTagStyle from './AllTagStyle';

const SearchAllTags = () => {
	const dispatch = useAppDispatch();
	const { tags } = useAppSelector((state) => state.tag);

	useEffect(() => {
		dispatch(getTags());
	}, [dispatch, getTags]);

	return (
		<AllTagStyle>
			{tags.map((tag) => (
				<div key={tag.id}>
					<Tag href={`/search/tag?q=${tag.value}`}>
						<span>
							{tag.value} ({tag.count})
						</span>
					</Tag>
				</div>
			))}
		</AllTagStyle>
	);
};

export default SearchAllTags;
