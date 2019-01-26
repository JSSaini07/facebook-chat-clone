const path = require('path');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, '../build/js/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                      presets: ['es2015', 'react']
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "../build/js/")
    }
};
