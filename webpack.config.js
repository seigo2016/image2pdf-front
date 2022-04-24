const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    target: 'web',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "main.js"
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: 'ts-loader'
        }]
    },
    resolve: {
        modules: [
            "node_modules"
        ],
        extensions: [
            '.ts',
            '.js'
        ],
        fallback: {
            "buffer": require.resolve("buffer")
        }
    },
    externals: {
        sortablejs: "Sortable"
    },
    plugins: [
        new webpack.ProvidePlugin({
            Sortable: "sortablejs"
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, "./dist/"),
        }
    }
};