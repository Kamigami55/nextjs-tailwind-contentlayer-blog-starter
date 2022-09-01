import { format, parseISO } from 'date-fns';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useMDXComponent } from 'next-contentlayer/hooks';

import { allPosts, Post } from '@/lib/contentLayerAdapter';

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allPosts.map((post) => post.path);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = ({ params }) => {
  const post = allPosts.find((post) => post.slug === params?.slug);
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};

type Props = {
  post: Post;
};

const PostPage: NextPage<Props> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{post.title}</h1>

        <time dateTime={post.date}>
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>

        <MDXContent />
      </main>
    </div>
  );
};

export default PostPage;
