import Document, { Head, Html, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from 'src/lib/gtagConfig';

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{/* hijs style */}
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/a11y-dark.min.css'
					></link>

					{/* google webconsole */}
					<meta
						name='google-site-verification'
						content='3yQnN4a3laP_8uJlbw0p-c0XNOQlISHhCfBdGfGTq4w'
					/>

					{/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
					></script>
					<script
						dangerouslySetInnerHTML={{
							__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript></NextScript>
				</body>
			</Html>
		);
	}
}
