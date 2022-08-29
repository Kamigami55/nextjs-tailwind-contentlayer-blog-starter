module.exports = {
  extends: [
    'eason',
    'next/core-web-vitals',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      extends: [
        'eason/typescript',
        'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
      ],
    },
  ],
};
