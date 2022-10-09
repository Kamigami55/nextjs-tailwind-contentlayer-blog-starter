import { allPosts } from '@/lib/contentLayerAdapter';
import { unifyPath } from '@/lib/unifyPath';

export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

export const getAllRedirects = () => {
  const redirects: Redirect[] = [];

  allPosts.forEach((post) => {
    const allRedirectFrom =
      post.redirectFrom?.map((from) => unifyPath(from)) || [];
    allRedirectFrom.forEach((from) => {
      redirects.push({
        source: from,
        destination: post.path,
        permanent: false,
      });
    });
  });

  return redirects;
};

export const allRedirects = getAllRedirects();
