const path = require('path');

module.exports = {
  // Entry point for your React app (starting point for bundling)
  entry: './src/index.js', // 'src/index.js' is the entry file

  // Output configuration for Webpack (where to store the bundled file)
  output: {
    filename: 'bundle.js', // The name of the bundled file
    path: path.resolve(__dirname, 'build'), // The 'public' folder to serve from
  },

  // Module configuration: how to handle different file types
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match JavaScript/JSX files
        exclude: /node_modules/, // Exclude node_modules from being transpiled
        use: {
          loader: 'babel-loader', // Use Babel to transpile the code
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
          },
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'], // Resolve both .js and .jsx extensions
  },

  // Dev server configuration for local development
  devServer: {
    contentBase: path.join(__dirname, 'public'), // Serve files from 'public' folder
    port: 3000, // The port to run the dev server on
  },

  // Mode for Webpack (either 'development' or 'production')
  mode: 'development',
};