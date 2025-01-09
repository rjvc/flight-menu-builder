const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production', // Explicitly set the mode to 'production'
  entry: path.resolve(__dirname, 'src', 'server.js'),  // Ensure this path is resolved correctly
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory within the backend folder
    filename: 'bundle.js',
  },
  externals: [nodeExternals()], // Exclude node_modules from the bundle
  node: {
    __dirname: false,
    __filename: false,
  },
};
