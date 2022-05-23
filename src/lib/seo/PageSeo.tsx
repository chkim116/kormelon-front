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
	title = 'Kormelon Devlog 👨‍💻',
	desc = '가끔 생각날 때 정리하는 블로그',
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
					authors: ['김창회'],
				},
				title,
				description: desc,
				type: 'article',
				locale: 'ko_KR',
				url,
				site_name: 'Kormelon Devlog 👨‍💻',
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
