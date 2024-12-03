const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your app
  output: {
    filename: 'bundle.js', // Output file
    path: path.resolve(__dirname, 'build'), // Output directory
    clean: true, // Clean the build folder before each build
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Match JavaScript/JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Transpile modern JS and React
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Load and bundle CSS
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/, // Image files
        type: 'asset/resource', // Uses Webpack's asset modules to handle static files
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      },      
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve JS and JSX extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Use the HTML template in public
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'), // Serve files from build folder
    },
    port: 3000, // Port for the dev server
    historyApiFallback: true, // Enable routing for React Router
  },
  mode: 'production', // Use development mode
};
