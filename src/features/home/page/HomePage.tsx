import { NextSeo } from 'next-seo';

export const HomePage = () => {
	return (
		<>
			<NextSeo title='Home' />
			<div style={{ fontFamily: 'Pretendard ' }}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius mollitia
				numquam iure, quasi, quos itaque voluptatibus voluptatem eum in quisquam
				dicta aliquam delectus aperiam accusantium neque temporibus animi
				ducimus libero!
			</div>
		</>
	);
};
