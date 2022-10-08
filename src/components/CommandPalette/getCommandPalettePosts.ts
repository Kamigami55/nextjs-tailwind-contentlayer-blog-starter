import { allPostsNewToOld } from '@/lib/contentLayerAdapter';

export type PostForCommandPalette = {
  slug: string;
  title: string;
  path: string;
};

export const getCommandPalettePosts = (): PostForCommandPalette[] => {
  const commandPalettePosts = allPostsNewToOld.map((post) => ({
    slug: post.slug,
    title: post.title,
    path: post.path,
  }));
  return commandPalettePosts;
};
