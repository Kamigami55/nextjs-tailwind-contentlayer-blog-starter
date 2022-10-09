import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { allRedirects, Redirect } from '@/lib/getAllRedirects';
import { stringifyCatchAllDynamicRoute } from '@/lib/stringifyCatchAllDynamicRoute';
import { unifyPath } from '@/lib/unifyPath';

interface Params extends ParsedUrlQuery {
  pathToRedirectFrom: string | string[];
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<any, Params> = (context) => {
  const { pathToRedirectFrom } = context.params!;

  // Handle redirect logic
  const path = unifyPath(stringifyCatchAllDynamicRoute(pathToRedirectFrom));
  const matchedRedirectRule: Redirect | undefined = allRedirects.find(
    (rule) => rule.source === path
  );
  if (matchedRedirectRule) {
    return {
      redirect: {
        destination: matchedRedirectRule.destination,
        permanent: matchedRedirectRule.permanent,
      },
    };
  }

  return {
    notFound: true,
  };
};

const NullComponent = () => null;

export default NullComponent;
