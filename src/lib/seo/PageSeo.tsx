import { NextSeo } from 'next-seo';

const imageSample =
	process.env.NODE_ENV === 'production'
		? 'https://assets-kormelon-v2.s3.ap-northeast-2.amazonaws.com/img/profile.jpeg'
		: '';

interface PageSeoProps {
	title?: string;
	desc?: string;
	url?: string;
	image?: string;
}

const PageSeo = ({
	title = 'Kormelon Devlog π¨βπ»',
	desc = 'κ°λ μκ°λ  λ μ λ¦¬νλ λΈλ‘κ·Έ',
	url = 'https://www.kormelon.com',
	image,
}: PageSeoProps) => {
	return (
		<NextSeo
			title={title}
			description={desc}
			canonical={url}
			openGraph={{
				article: {
					authors: ['κΉμ°½ν'],
				},
				title,
				description: desc,
				type: 'article',
				locale: 'ko_KR',
				url,
				site_name: 'Kormelon Devlog π¨βπ»',
				images: [
					{
						url: image || imageSample,
						alt: title,
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

export default PageSeo;
