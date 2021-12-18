import hljs from 'highlight.js/lib/common';
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));
import marked from 'marked';

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return hljs.highlightAuto(code, ['html', 'css', 'javascript', 'xml', 'python']).value;
  },
});
