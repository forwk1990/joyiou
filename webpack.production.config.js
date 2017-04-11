/**
 * Created by Rains
 * on 2016-10-20.
 */

/*<%@page contentType="text/html"%>
 <%@page pageEncoding="UTF-8"%>*/

const ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var webpack = require('webpack');

const fs = require('fs');
const imagesDirectoryPath = path.resolve('src/assets/images/');
var imagePathAlias = {};
const imagesFiles = fs.readdirSync(imagesDirectoryPath);
imagesFiles.forEach(function (file) {
    const filename = file.replace(path.extname(file), "");
    imagePathAlias[filename] = path.resolve('src/assets/images/', file);
});


//var WebpackDevServer = require("webpack-dev-server");
// var CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
// var ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
// var MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
// var BUILD_PATH = path.join(ROOT_PATH, './build'); // 最后输出放置公共资源的目录

var HtmlWebpackPlugin = require('html-webpack-plugin');

//@font-size-heading

const theme = {
    "@primary-color": "#FDB32B",
    "@blue-6": '#FDB32B'
};

const lessLoader = 'style!css!less?{"modifyVars":' + JSON.stringify({theme}) + '}';

// const host = "192.168.31.169";/**/ // 广埠屯
// const host = "192.168.2.112";/**/ // 家用
const host = "www.joyiou.com"; // 公司
// const host = '192.168.31.192'
const serverRelativeFolder = 'ldtedwechat';

module.exports = {
    // The base directory (absolute path!) for resolving the entry option
    context: __dirname,
    entry: {
        app: './src/Entry.js',
        react: ['redux-thunk', 'react-redux', 'react-router', 'react-router-transition', 'redux', 'qrcode.react'],
        libs: ['query-string']
    }, // we can also write path.resolve(__dirname,'app/Entry.js') without context setting
    output: {
        /*
         * the output.path directory as absolute path
         * */
        path: path.join(__dirname, 'dist'),
        filename: 'javascript/index.[hash].js',
        publicPath: `http://${host}/manage/`
    },

    resolve: {
        alias: Object.assign({}, imagePathAlias),
        root: [ // the root directory for searching modules
            path.resolve('src/userInterface/'),
            path.resolve('src/userInterface/common'),
            path.resolve('src/libs/')
        ],
        fallback: [// webpack will find modules with the fallback directories when searching failed.
            path.resolve('node_modules/'),
            path.resolve('src/libs/components')
        ],
        /*
         * 后缀自动补全,“”用于解析全称如"./xxx.js"，“.js”用于解析统一后缀,如"./xxx"
         * */
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },

    //热部署相关配置
    devServer: {
        historyApiFallback: true,
        contentBase: "./",   //服务器目录
        quiet: false, //控制台中不输出打包的信息
        noInfo: false,
        hot: true,
        inline: true,
        lazy: false,
        progress: true, //显示打包的进度
        watchOptions: {
            aggregateTimeout: 300
        },
        host: host,
        port: "8787"
    },

    plugins: [

        //new webpack.HotModuleReplacementPlugin(),
        // 提取公共部分资源

        new webpack.optimize.CommonsChunkPlugin({
            // 与 entry 中的 vendors 对应
            name: ['react', 'libs'],
            // 输出的公共资源名称
            filename: 'javascript/[id].[hash].js',
            // 对所有entry实行这个规则
            minChunks: Infinity
        }),

        new HtmlWebpackPlugin({
            title: '喜悦来了',
            filename: 'index.jsp',
            template: 'public/index.template.html',      //按照此文件内容生成index.html
            inject: 'body',
            minify: false,
            favicon: path.resolve('public/favicon.ico'),
            hash: true,
            cache: false,
            showErrors: false

        }),
        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            compress: {
                warnings: false
            },
        }),
        /*
         * The Webpack DefinePlugin allows you to create "Magic" global variables for your app
         * that Webpack will replace when it bundles your project.
         * The cool thing about this is that it does a literal replacement of the variable with the string you assign.
         * I used this functionality to eliminate a separate,
         * conditionally included "development" JavaScript file
         * */
        new webpack.DefinePlugin({
            __DEV__: 'false',
            __SERVER_URL__: JSON.stringify(host),
            __IS_SERVER_MODE: 'true', //是否服务号模式。
            __SERVER_RELATIVE_FOLDER: JSON.stringify(serverRelativeFolder),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=4048&name=images/[hash].[ext]' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像 大于这个尺寸的图片会拷贝到build目录下
            },
            {
                test: /\.woff/,
                loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff&name=fonts/[hash].[ext]'
            }, {
                test: /\.ttf/,
                loader: 'file?prefix=font/&name=fonts/[hash].[ext]'
            }, {
                test: /\.eot/,
                loader: 'file?prefix=font/&name=fonts/[hash].[ext]'
            }, {
                test: /\.svg/,
                loader: 'file?prefix=font/&name=fonts/[hash].[ext]'
            },
            {
                test: /\.less$/,
                loader: lessLoader
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                loaders: ["style", 'css', "sass"]
            }
        ]
    }
}