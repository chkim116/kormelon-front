import hljs from 'highlight.js';
hljs.registerLanguage('javascript', require('../node_modules/highlight.js/lib/languages/javascript'));

export const highlights = (node: any) => {
  if (node) {
    node.forEach((node: HTMLElement) => {
      hljs.highlightBlock(node);
    });
  }
};
