import { DefaultSeo as Default } from 'next-seo';

const image =
	process.env.NODE_ENV === 'production'
		? 'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/img/profile.jpeg'
		: '';

const DefaultSeo = () => {
	return (
		<Default
			title='Kormelon Devlog π¨βπ»'
			description='μΉκ°λ°μ κΉμ°½νμ κ°λ° λΈλ‘κ·Έ'
			canonical='μΉκ°λ°μ κΉμ°½νμ κ°λ° λΈλ‘κ·Έ'
			openGraph={{
				article: {
					authors: ['κΉμ°½ν'],
				},
				title: 'Kormelon Devlog π¨βπ»',
				description: 'μΉκ°λ°μ κΉμ°½νμ κ°λ° λΈλ‘κ·Έ',
				type: 'blog',
				locale: 'ko_KR',
				url: 'https://www.kormelon.com/',
				site_name: 'Kormelon Devlog π¨βπ»',
				images: [
					{
						url: image,
						alt: `Kormelon Devlog π¨βπ»`,
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
