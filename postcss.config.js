module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // 生产环境CSS优化
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
        }],
      },
    }),
  },
};
