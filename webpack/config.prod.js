const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./rules')

module.exports = {
	entry: {
		app: path.resolve(__dirname, '../src/index.tsx'),
	},
	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules'],
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			cache: false,
			hash: true,
			inject: true,
			minify: {
				collapseWhitespace: true,
				html5: true,
				sortAttributes: true,
				sortClassName: true,
				removeScriptTypeAttributes: true,
			},
			template: 'public/index.html',
		}),
	],
	module: { rules },
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
	},
	mode: 'production',
	devServer: {
		contentBase: '../dist'
	}
}
