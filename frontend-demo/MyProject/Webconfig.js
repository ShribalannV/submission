const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
 
module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
 
    return {
        mode: argv.mode,
        entry: './src/index.ts',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                }
            ]
        },
        optimization: isProd ? {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: true,
                        mangle: true,
                        format: {
                            comments: false,
                        },
                    },
                    extractComments: false,
                })
            ]
        } : {},
        devtool: isProd ? false : 'source-map'
    };
};