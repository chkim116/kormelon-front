import { DefaultSeo as Default } from 'next-seo';

const image =
	process.env.NODE_ENV === 'production'
		? 'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/img/profile.jpeg'
		: '';

const DefaultSeo = () => {
	return (
		<Default
			title='Kormelon Devlog 👨‍💻'
			description='웹개발자 김창회의 개발 블로그'
			canonical='웹개발자 김창회의 개발 블로그'
			openGraph={{
				article: {
					authors: ['김창회'],
				},
				title: 'Kormelon Devlog 👨‍💻',
				description: '웹개발자 김창회의 개발 블로그',
				type: 'blog',
				locale: 'ko_KR',
				url: 'https://www.kormelon.com/',
				site_name: 'Kormelon Devlog 👨‍💻',
				images: [
					{
						url: image,
						alt: `Kormelon Devlog 👨‍💻`,
					},
				],
			}}
			twitter={{
				handle: '@handle',
				site: '@site',
				cardType: 'summary_large_image',
			}}
		/>
	);
};

export default DefaultSeo;
