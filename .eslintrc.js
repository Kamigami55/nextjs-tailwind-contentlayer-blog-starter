module.exports = {
  extends: [
    'eason',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended', // Make this the last element so prettier config overrides other formatting rules
  ],
  plugins: ['tailwindcss'],
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'tailwindcss/classnames-order': 'off', // Respect prettier-plugin-tailwindcss order
  },
  settings: {
    // Support absolute imports
    // https://www.npmjs.com/package/eslint-import-resolver-alias
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/ignore': ['contentLayerAdapter.js'],
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
