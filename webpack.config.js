const path = require('path');

module.exports = {
  // Other webpack configurations...
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      // Add more aliases as needed
    },
  },
};
