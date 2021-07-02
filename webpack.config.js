const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        app: ['./src/app/app.tsx'],
        vendor: ['react', 'react-dom'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        publicPath: '',
    },
    optimization: {
        splitChunks: { chunks: 'all' },
        moduleIds: 'named',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'src/'),
        historyApiFallback: true,
        compress: true,
        hot: true,
        port: 3000,
        publicPath: '/',
        noInfo: false,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [
            path.resolve('./src'),
            'node_modules/',
        ],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
        new MiniCssExtractPlugin({ filename: 'main.css' }),
        new ESLintPlugin({
            context: path.join(__dirname, 'src/'),
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.devtool = 'source-map';
        config.optimization.moduleIds = 'size';

        const index = config.module.rules.findIndex(rule => rule.test.test('main.scss'));
        if (index !== -1) {
          config.module.rules[index].use = [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ];
        }
    }

    return config;
}
