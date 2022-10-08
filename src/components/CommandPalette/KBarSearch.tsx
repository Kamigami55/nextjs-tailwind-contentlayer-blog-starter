// Custom KBarSearch component to fix cannot input Chinese issue
// A replacement of KBarSearch component from kbar
// import { KBarSearch } from 'kbar';
// Copied from: https://github.com/timc1/kbar/issues/237#issuecomment-1253691644

import { useKBar, VisualState } from 'kbar';
import React, { useState } from 'react';

export const KBAR_LISTBOX = 'kbar-listbox';
export const getListboxItemId = (id: number) => `kbar-listbox-item-${id}`;

export function KBarSearch(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    defaultPlaceholder?: string;
  }
) {
  const {
    query,
    searchQuery,
    actions,
    currentRootActionId,
    activeIndex,
    showing,
    options,
  } = useKBar((state) => ({
    searchQuery: state.searchQuery,
    currentRootActionId: state.currentRootActionId,
    actions: state.actions,
    activeIndex: state.activeIndex,
    showing: state.visualState === VisualState.showing,
  }));
  const [search, setSearch] = useState(searchQuery);

  const ownRef = React.useRef<HTMLInputElement>(null);

  const { defaultPlaceholder, ...rest } = props;

  React.useEffect(() => {
    query.setSearch('');
    ownRef.current!.focus();
    return () => query.setSearch('');
  }, [currentRootActionId, query]);

  React.useEffect(() => {
    query.setSearch(search);
  }, [query, search]);

  const placeholder = React.useMemo((): string => {
    const defaultText = defaultPlaceholder ?? 'Type a command or search…';
    return currentRootActionId && actions[currentRootActionId]
      ? actions[currentRootActionId].name
      : defaultText;
  }, [actions, currentRootActionId, defaultPlaceholder]);

  return (
    <input
      {...rest}
      ref={ownRef}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      autoComplete="off"
      role="combobox"
      spellCheck="false"
      aria-expanded={showing}
      aria-controls={KBAR_LISTBOX}
      aria-activedescendant={getListboxItemId(activeIndex)}
      value={search}
      placeholder={placeholder}
      onChange={(event) => {
        props.onChange?.(event);
        setSearch(event.target.value);
        options?.callbacks?.onQueryChange?.(event.target.value);
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event);
        if (currentRootActionId && !search && event.key === 'Backspace') {
          const parent = actions[currentRootActionId].parent;
          query.setCurrentRootAction(parent);
        }
      }}
    />
  );
}
