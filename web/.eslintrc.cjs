module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  overrides: [
    {
      files: ['pages/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': ['error', {
          paths: [{ name: 'next/navigation', message: 'Pages Routerでは使用禁止。next/routerを使うこと。' }],
        }],
      },
    },
  ],
};
