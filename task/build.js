var pkg = require('./../package.json');
var path = require('path');
var webpack = require('webpack');

var config = {
    entry: './src/js/index',
    externals: {
        'three': 'THREE'
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: pkg.name + '.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            },
            include: path.join(__dirname, '../src'),
            exclude: ['node_modules']
        }, {
            test: /\.css$/, loader: "style-loader!css-loader",
            include: path.join(__dirname, '../src'),
            exclude: ['node_modules']
        }]
    }
};

webpack(config, function (err, stats) {
    if (err) {
        console.error(err);
    } else if (stats.compilation.errors.length) {
        stats.compilation.errors.forEach(function (e, index) {
            console.error(e.message);
        });
    } else {
        console.info('==> JS build success!');
    }
});