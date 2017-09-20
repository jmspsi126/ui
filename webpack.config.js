var path = require('path')
var webpack = require('webpack')
var _ = require('underscore')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require("glob")


var plugins = [
    new ExtractTextPlugin({filename:'[name].css',  allChunks: true }),
    new webpack.LoaderOptionsPlugin({
        test: /\.(less|css)$/,
        options: {
           "lessLoader": {
                lessPlugins: [
                    //new LessPluginAutoPrefix(),
                ]
            }
        }
    })
]

var entries = {}
_.each(glob.sync('./src/test/*.js', {ignore:['./src/test/index.js']}), function(file){
    var chunkName = path.basename(file, '.js')
    entries[chunkName] = file
    plugins.push(new HtmlWebpackPlugin({
        filename:`${chunkName}.html`,
        template: 'template.ejs',
        chunks:[chunkName]
    }))
})


module.exports = {
    entry:entries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        publicPath: ''
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude:'node_modules', loader: "babel-loader"},
            { test: /\.json$/, loader: "json-loader" },
            {
                test: /\.(less|css)$/,
                loader:ExtractTextPlugin.extract({
                    loader:[
                        {
                            loader:'css-loader',
                            query:{
                                modules:false,
                                importLoaders:true,
                                localIdentName:'[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader:'less-loader',
                        },
                    ]
                })
            },
        ]
    },
    plugins:plugins,
    resolve: {
        alias: {
            "ui": path.resolve(process.cwd(), './src'),
        },
    },
}