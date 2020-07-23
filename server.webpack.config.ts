import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

import tsconfig from './tsconfig.json';

const config = (): webpack.Configuration => {
	//To save duplication across 3 files, we are using TSCONFIG.json to track our aliases
	//as it's the only one we can't programatically fille
	const webpackAliases: { [key: string]: string } = {};
	const paths: { [key: string]: string[] } = tsconfig.compilerOptions.paths;
	//For each tsconfig path, we need to resolve the absolute path from here.
	Object.keys(paths).forEach(key => (webpackAliases[key] = path.resolve(__dirname, `./src/${paths[key][0]}`)));

	return {
		entry: './server',
		externals: [nodeExternals()],
		target: 'node',
		output: {
			path: path.join(__dirname, './server-build'),
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json'],
			alias: webpackAliases,
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
				{
					test: /\.png$/i,
					loader: 'file-loader',
					options: {
						outputPath: 'images',
					},
				}
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './index.html',
			}),
		],
	};
};

export default config;
