const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const host = 'localhost'
const port = 3000

const config = {
	entry: {
		main: [
			path.resolve(__dirname, '../src/index.tsx'),
		],
	},
	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					'babel-loader',
					'ts-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(css|pcss)$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]--[local]--[hash:base64:5]',
							sourceMap: true,
							importLoaders: 1,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('postcss-preset-env')({
									stage: 0,
									browsers: ['last 2 versions'],
								}),
								require('cssnano')(),
							],
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: 'url-loader',
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|mp4|webm|mp3|wav|aac|ogg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/[name].[sha1:hash].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		host,
		port,
		historyApiFallback: true,
		publicPath: '/',
		stats: {
			all: false,
			chunks: true,
			timings: true,
			hash: true,
			warnings: true,
			errors: true,
			version: true,
		},
	},
	devtool: 'source-map',
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			cache: false,
			hash: true,
			inject: true,
			minify: {
				collapseWhitespace: true,
				html5: true,
				sortAttributes: true,
				sortClassName: true,
			},
			template: 'public/index.html',
		}),
	],
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
	output: {
		pathinfo: true,
		path: path.resolve(__dirname, '../build'),
		publicPath: '/',
	},
}

module.exports = (_, { mode }) => {
	if (mode === 'development') {
		config.entry.main.unshift(
			'react-hot-loader/patch',
			`webpack-dev-server/client?http://${host}:${port}`,
			'webpack/hot/only-dev-server'
		)
	}

	config.plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(mode),
	}))

	return config
}
