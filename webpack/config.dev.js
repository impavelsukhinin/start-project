const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const rules = require('./rules')

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
	module: { rules },
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
	output: {
		pathinfo: true,
		path: path.resolve(__dirname, 'build'),
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
