import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel='stylesheet'
						href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/a11y-dark.min.css'
					></link>
				</Head>
				<body>
					<Main />
					<NextScript></NextScript>
				</body>
			</Html>
		);
	}
}
