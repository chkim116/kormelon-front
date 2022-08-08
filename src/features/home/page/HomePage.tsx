import { NextSeo } from 'next-seo';
import { HomeContainer } from '../containers/HomeContainer';

export const HomePage = () => {
	return (
		<>
			<NextSeo title='Home' />
			<HomeContainer />
		</>
	);
};
