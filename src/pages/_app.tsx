import '@/styles/globals.css';
import '@/styles/prism-dracula.css';
import '@/styles/prism-plus.css';
import 'nprogress/nprogress.css';
import '@/styles/nprogress-custom.scss';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';
import { useEffect } from 'react';

import CommandPalette from '@/components/CommandPalette';
import LayoutWrapper from '@/components/LayoutWrapper';
import { siteConfigs } from '@/configs/siteConfigs';

import nextI18nConfig from '../../next-i18next.config';

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Integrate nprogress
  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider attribute="class">
      <CommandPalette>
        <DefaultSeo
          titleTemplate={`%s | ${siteConfigs.titleShort}`}
          defaultTitle={siteConfigs.title}
          description={siteConfigs.description}
          canonical={siteConfigs.fqdn}
          openGraph={{
            title: siteConfigs.title,
            description: siteConfigs.description,
            url: siteConfigs.fqdn,
            images: [
              {
                url: siteConfigs.bannerUrl,
              },
            ],
            site_name: siteConfigs.title,
            type: 'website',
          }}
          twitter={{
            handle: siteConfigs.twitterID,
            site: siteConfigs.twitterID,
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
          additionalLinkTags={[
            {
              rel: 'icon',
              href: siteConfigs.logoPath,
            },
            {
              rel: 'alternate',
              type: 'application/rss+xml',
              href: '/feed.xml',
            },
            {
              rel: 'alternate',
              type: 'application/atom+xml',
              href: '/atom.xml',
            },
          ]}
        />

        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </CommandPalette>
    </ThemeProvider>
  );
}

// Explicitly pass nextI18nConfig to suppress i18next console warning
// `react-i18next:: You will need to pass in an i18next instance by using initReactI18next`
// Ref: https://github.com/i18next/next-i18next/issues/718#issuecomment-1190468800
export default appWithTranslation(MyApp, nextI18nConfig);
