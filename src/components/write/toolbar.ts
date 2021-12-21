export const addMark = (
  text: string,
  start: number,
  end: number,
  toolbar: string,
  inline: string,
  img?: string,
): string => {
  const startText = text.slice(0, start);
  const curText = text.slice(start, end);
  const restText = text.slice(end, text.length);
  const insideText = (curText: string) => `${startText}${curText}${restText}`;

  let newText;
  switch (toolbar) {
    case 'img': {
      newText = insideText(`\n![](${img})\n`);
      return newText;
    }
    case '#': {
      curText ? (newText = insideText(`${toolbar + ' '} ${curText}`)) : (newText = insideText(`${toolbar + ' '} `));
      return newText;
    }
    case '[]()': {
      curText ? (newText = insideText(`[](${curText})`)) : (newText = insideText(`${toolbar}`));
      return newText;
    }
    case '```': {
      curText
        ? (newText = insideText(`${toolbar}js\n${curText}\n${toolbar}`))
        : (newText = insideText(`\n${toolbar}js\n${toolbar}`));
      return newText;
    }
    case '>': {
      curText ? (newText = insideText(`${toolbar} ${curText} \n`)) : (newText = insideText(`${toolbar} \n`));
      return newText;
    }
    case '---': {
      newText = insideText(`\n${toolbar}\n`);
      return newText;
    }
    case '-': {
      curText ? (newText = insideText(`${toolbar} ${curText} \n`)) : (newText = insideText(`${toolbar} \n`));
      return newText;
    }
    default: {
      if (inline) {
        curText
          ? (newText = insideText(`${toolbar}${curText}${toolbar}`))
          : (newText = insideText(`${toolbar}${toolbar}`));
        return newText;
      } else {
        curText ? (newText = insideText(`${toolbar}${curText}`)) : (newText = insideText(`${toolbar} `));
        return newText;
      }
    }
  }
};
