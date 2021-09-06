import { NextSeo } from 'next-seo';
import React from 'react';

type Props = {
  title?: string;
  desc?: string;
  url?: string;
  image?: string;
};

const SEO = ({
  title = '개발자의 생각창고',
  desc = '개발은 재밌게 해야죠?',
  url = 'https://www.kormelon.com',
  image = 'https://images.unsplash.com/photo-1616812757130-aca5451b0243?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
}: Props) => {
  return (
    <NextSeo
      title={`${title}`}
      description={`${desc}`}
      canonical={url}
      openGraph={{
        article: {
          authors: ['김개발'],
        },
        title: `${title}`,
        description: `${desc}`,
        type: 'article',
        locale: 'ko_KR',
        url,
        site_name: '생각창고',
        images: [
          {
            url: `${image}`,
            alt: `${title}`,
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

export default SEO;
