import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import tsconfig from './tsconfig.json';

const config = (env: 'production' | 'development'): webpack.Configuration => {
	//To save duplication across 3 files, we are using TSCONFIG.json to track our aliases
	//as it's the only one we can't programatically fille
	const webpackAliases: {[key: string]: string} = {};
	const paths: {[key: string]: string[]} = tsconfig.compilerOptions.paths;
	//For each tsconfig path, we need to resolve the absolute path from here.
	Object.keys(paths).forEach(
		key => (webpackAliases[key] = path.resolve(__dirname, `src/${paths[key][0]}`)),
	);

	return {
		mode: env,
		entry: './src/index',
		output: {
			path: path.join(__dirname, '/dist'),
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.json'],
			alias: webpackAliases,
		},
		module: {
			rules: [
				// we use babel-loader to load our jsx and tsx files
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
		]
	};
};

export default config;