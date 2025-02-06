// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // すべてのページに適用
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};