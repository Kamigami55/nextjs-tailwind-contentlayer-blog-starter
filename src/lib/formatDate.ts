const formatDate = (date: string, locale = 'zh-TW') => {
  const now = new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return now;
};

export default formatDate;
