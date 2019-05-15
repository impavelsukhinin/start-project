
module.exports = [
	{
		test: /\.tsx?$/,
		use: [
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
					localIdentName: `${process.env.NODE_ENV === 'development' ? '[name]--[local]--' : ''}[hash:base64:5]`,
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
]
