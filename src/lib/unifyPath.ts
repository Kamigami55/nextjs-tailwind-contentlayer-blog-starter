// Discard leading and trailing slashes
export const unifyPath = (path: string): string => {
  return '/' + path.replace(/\/$/, '').replace(/^\//, '');
};
