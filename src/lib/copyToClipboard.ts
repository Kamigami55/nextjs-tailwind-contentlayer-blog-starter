// ref: https://philstainer.io/blog/copy-code-button-markdown

export const copyToClipboard = (text: string) => {
  return new Promise((resolve, reject) => {
    if (navigator?.clipboard) {
      const cb = navigator.clipboard;

      cb.writeText(text).then(resolve).catch(reject);
    } else {
      try {
        const body = document.querySelector('body');

        const textarea = document.createElement('textarea');
        body?.appendChild(textarea);

        textarea.value = text;
        textarea.select();
        document.execCommand('copy');

        body?.removeChild(textarea);

        resolve(void 0);
      } catch (e) {
        reject(e);
      }
    }
  });
};
