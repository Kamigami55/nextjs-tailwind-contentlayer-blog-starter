/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';

const LanguageSwitch = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const nextLocale = router.locale === 'en' ? 'zh-TW' : 'en';

  return (
    <Link locale={nextLocale} href={{ pathname, query }}>
      <a
        aria-label="Toggle Language"
        className="rounded p-2 text-2xl leading-6 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 sm:p-3"
      >
        {router.locale === 'en' ? '🇺🇸' : '🇹🇼'}
      </a>
    </Link>
  );
};

export default LanguageSwitch;
