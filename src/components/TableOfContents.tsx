// ref: https://github.com/ekomenyong/kommy-mdx/blob/main/src/components/TOC.tsx

import clsx from 'clsx';
import GithubSlugger from 'github-slugger';
import { useTranslation } from 'next-i18next';
import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line no-unused-vars
type UseIntersectionObserverType = (setActiveId: (id: string) => void) => void;

const useIntersectionObserver: UseIntersectionObserverType = (setActiveId) => {
  const headingElementsRef = useRef<{
    [key: string]: IntersectionObserverEntry;
  }>({});

  useEffect(() => {
    const callback = (headings: IntersectionObserverEntry[]) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;

        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(b.target.id) - getIndexFromId(a.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -70% 0px',
    });

    const headingElements = Array.from(
      document.querySelectorAll('article h2,h3')
    );

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

type Props = {
  source: string;
};

const TableOfContents = ({ source }: Props) => {
  const { t } = useTranslation(['common']);

  const headingLines = source
    .split('\n')
    .filter((line) => line.match(/^###?\s/));

  const headings = headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, '');
    const level = raw.slice(0, 3) === '###' ? 3 : 2;
    const slugger = new GithubSlugger();

    return {
      text,
      level,
      id: slugger.slug(text),
    };
  });

  const [activeId, setActiveId] = useState<string>();

  useIntersectionObserver(setActiveId);

  return (
    <div className="mt-10">
      <p className="mb-5 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
        {t('table-of-contents').toUpperCase()}
      </p>
      <div className="flex flex-col items-start justify-start">
        {headings.map((heading, index) => {
          return (
            <button
              key={index}
              type="button"
              className={clsx(
                heading.id === activeId
                  ? 'font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                  : 'font-normal text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200',
                heading.level === 3 && 'pl-4',
                'mb-3 text-left text-sm transition-colors hover:underline'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                  inline: 'nearest',
                });
              }}
            >
              {heading.text}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableOfContents;
