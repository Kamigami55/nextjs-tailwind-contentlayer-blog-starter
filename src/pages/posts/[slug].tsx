import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { ArticleJsonLd, NextSeo } from 'next-seo';

import PostLayout, {
  PostForPostLayout,
  RelatedPostForPostLayout,
} from '@/components/PostLayout';
import { siteConfigs } from '@/configs/siteConfigs';
import { allPosts, allPostsNewToOld } from '@/lib/contentLayerAdapter';
import { getPostOGImage } from '@/lib/getPostOGImage';
import mdxComponents from '@/lib/mdxComponents';

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
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allPosts.map((post) => post.path);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const postIndex = allPostsNewToOld.findIndex(
    (post) => post.slug === params?.slug
  );
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
      post,
      prevPost,
      nextPost,
    },
  };
};

const PostPage: NextPage<Props> = ({ post, prevPost, nextPost }) => {
  const {
    description,
    title,
    date,
    path,
    socialImage,
    body: { code },
  } = post;
  const url = siteConfigs.fqdn + path;
  const ogImage = getPostOGImage(socialImage);

  const MDXContent = useMDXComponent(code);

  return (
    <>
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
    </>
  );
};

export default PostPage;
