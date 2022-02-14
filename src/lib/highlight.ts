import { marked } from 'marked';

marked.setOptions({
	langPrefix: 'hljs language-',
	highlight: (code, lang) => {
		const hljs = require('highlight.js/lib/common');
		const language = hljs.getLanguage(lang) ? lang : 'plaintext';
		return hljs.highlight(code, { language }).value;
	},
});
