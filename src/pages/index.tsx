import type { NextPage } from 'next';
import Head from 'next/head';

import ThemeSwitch from '@/components/ThemeSwitch';
import { allPostsNewToOld, Post } from '@/lib/contentLayerAdapter';

export function getStaticProps() {
  const posts = allPostsNewToOld;
  return { props: { posts } };
}

type Props = {
  posts: Post[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>My blog</title>
        <meta name="description" content="Welcome to my blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white p-4 text-black dark:bg-black dark:text-white">
        <h1 className="mb-6 text-4xl font-bold">Welcome to my blog!</h1>

        <div className="my-4">
          <ThemeSwitch />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="rounded-lg border border-black p-6 dark:border-white"
            >
              <a href={post.path}>
                <h2 className="mb-4 text-2xl font-semibold">{post.title}</h2>
                <p>{post.description}</p>
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
