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
		devtool: "source-map",
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
			extensions: ['.ts', '.tsx', '.js', '.css', '.scss', 'sass'],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{ test: /\.s[ac]ss$/i, use: [ 
					{ loader: "style-loader" },  // to inject the result into the DOM as a style block
					{ loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
					{ loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
					{ loader: "sass-loader" },  // to convert SASS to CSS
					// NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
				] },
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
