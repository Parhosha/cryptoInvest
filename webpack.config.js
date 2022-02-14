const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = (env) => {
	const devMode = env.NODE_ENV !== 'production';

	return {
		entry: './src/index.tsx',
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					test: /\.js(\?.*)?$/i,
					chunkFilter: (chunk) => {
						if (chunk.name === 'vendor') {
							return false;
						}
						return true;
					},
				}),
			],
			runtimeChunk: 'single',
		},
		resolve: {
			// Add `.ts` and `.tsx` as a resolvable extension.
			extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
						},
					},
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /node_modules/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.svg$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'svg-url-loader',
							options: {
								limit: 10000,
							},
						},
					],
				},
			],
		},
		output: {
			path: path.join(__dirname, '/dist'),
			filename: '[name].bundle.js',
		},
		plugins: [
			new WorkboxPlugin.GenerateSW({
				// Do not precache images
				exclude: [/\.(?:png|jpg|jpeg|svg)$/],

				// Define runtime caching rules.
				runtimeCaching: [
					{
						// Match any request that ends with .png, .jpg, .jpeg or .svg.
						urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

						// Apply a cache-first strategy.
						handler: 'CacheFirst',

						options: {
							// Use a custom cache name.
							cacheName: 'images',

							// Only cache 10 images.
							expiration: {
								maxEntries: 10,
							},
						},
					},
				],
			}),
			new HtmlWebpackPlugin({
				title: 'Caching',
				template: './public/index.html',
				filename: './index.html',
				favicon: './public/favicon.ico',
			}),
			new CleanWebpackPlugin(),
		],
	};
};

// npm i @babel/preset-env @babel/preset-react @types/react-router-dom css-loader eslint-config-prettier eslint-plugin-prettier prettier sass sass-loader script-ext-html-webpack-plugin svg-url-loader ts-loader typescript webpack webpack-cli webpack-dev-server workbox-webpack-plugin --save-dev
// npm i web-vitals redux-thunk redux-devtools-extension redux react-redux axios @types/react-dom @types/react @types/node
