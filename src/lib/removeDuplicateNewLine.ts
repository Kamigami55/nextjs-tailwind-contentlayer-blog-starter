// Workaround to work with rehype-prism-plus generated Pre blog for copy to clipboard feature
export const removeDuplicateNewLine = (text: string): string => {
  if (!text) return text;

  return text
    .replace(/(\r\n\r\n)/gm, `\r\n`)
    .replace(/(\n\n)/gm, `\n`)
    .replace(/(\r\r)/gm, `\r`);
};
