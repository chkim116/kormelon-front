import hljs from 'highlight.js';
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));
import marked from 'marked';

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return hljs.highlightAuto(code, ['html', 'javascript', 'js', 'python']).value;
  },
});
