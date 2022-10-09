import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { ParsedUrlQuery } from 'querystring';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/CommandPalette/getCommandPalettePosts';
import { useCommandPalettePostActions } from '@/components/CommandPalette/useCommandPalettePostActions';
import LayoutPerPage from '@/components/LayoutPerPage';
import PostLayout, {
  PostForPostLayout,
  RelatedPostForPostLayout,
} from '@/components/PostLayout';
import { LOCALES } from '@/configs/i18nConfigs';
import { siteConfigs } from '@/configs/siteConfigs';
import { allPosts, allPostsNewToOld } from '@/lib/contentLayerAdapter';
import { allRedirects } from '@/lib/getAllRedirects';
import { getPostOGImage } from '@/lib/getPostOGImage';
import mdxComponents from '@/lib/mdxComponents';
import { unifyPath } from '@/lib/unifyPath';

type PostForPostPage = PostForPostLayout & {
  title: string;
  description: string;
  date: string;
  path: string;
  socialImage: string | null;
  body: {
    code: string;
  };
};

type Props = {
  post: PostForPostPage;
  prevPost: RelatedPostForPostLayout;
  nextPost: RelatedPostForPostLayout;
  commandPalettePosts: PostForCommandPalette[];
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths: string[] = [];
  LOCALES.forEach((locale) => {
    paths.push(...allPosts.map((post) => `/${locale}${post.path}`));
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { slug } = context.params!;
  const locale = context.locale!;

  // Handle redirect logic
  const path = unifyPath('/posts/' + slug);
  const matchedRedirectRule = allRedirects.find((rule) => rule.source === path);
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    };
  }

  const commandPalettePosts = getCommandPalettePosts();

  const postIndex = allPostsNewToOld.findIndex((post) => post.slug === slug);
  if (postIndex === -1) {
    return {
      notFound: true,
    };
  }
  const prevFull = allPostsNewToOld[postIndex + 1] || null;
  const prevPost: RelatedPostForPostLayout = prevFull
    ? { title: prevFull.title, path: prevFull.path }
    : null;
  const nextFull = allPostsNewToOld[postIndex - 1] || null;
  const nextPost: RelatedPostForPostLayout = nextFull
    ? { title: nextFull.title, path: nextFull.path }
    : null;
  const postFull = allPostsNewToOld[postIndex];
  const post: PostForPostPage = {
    title: postFull.title,
    date: postFull.date,
    description: postFull.description,
    path: postFull.path,
    socialImage: postFull.socialImage || null,
    body: {
      code: postFull.body.code,
      raw: postFull.body.raw,
    },
  };

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post,
      prevPost,
      nextPost,
      commandPalettePosts,
    },
  };
};

const PostPage: NextPage<Props> = ({
  post,
  prevPost,
  nextPost,
  commandPalettePosts,
}) => {
  const {
    description,
    title,
    date,
    path,
    socialImage,
    body: { code },
  } = post;
  useCommandPalettePostActions(commandPalettePosts);

  const url = siteConfigs.fqdn + path;
  const ogImage = getPostOGImage(socialImage);

  const MDXContent = useMDXComponent(code);

  return (
    <LayoutPerPage>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title: title,
          description: description,
          url: url,
          images: [
            {
              url: ogImage,
            },
          ],
          type: 'article',
          article: {
            publishedTime: date,
            modifiedTime: date,
          },
        }}
      />

      <ArticleJsonLd
        url={url}
        title={title}
        images={[ogImage]}
        datePublished={date}
        dateModified={date}
        authorName={siteConfigs.author}
        description={description}
      />

      <PostLayout post={post} prevPost={prevPost} nextPost={nextPost}>
        <MDXContent components={mdxComponents} />
      </PostLayout>
    </LayoutPerPage>
  );
};

export default PostPage;
