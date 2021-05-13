import webpack from 'webpack';
import { resolve } from 'path';
import nodeExternals from 'webpack-node-externals';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const commonConfig: webpack.Configuration = {
  entry: './src/index.ts',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: ['ts-loader', 'eslint-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts'],
  },
  target: 'node',
};

export default commonConfig;
