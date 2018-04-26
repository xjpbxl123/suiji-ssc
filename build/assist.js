
const webpack = require('webpack')

const path = require('path')
const ENV = process.env.node_env
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webconfig = require('./webpack.config.js')
const CONT = {
    'development':{
        a:'"deve"',
    },
    "pre":{
        a:"'pre1239823932923892383929238'"
    }
}

module.exports = {
    getEnv(){
        return CONT[ENV]
    },
    plugs(){


        return [
            new webpack.HashedModuleIdsPlugin(),
            new ExtractTextWebpackPlugin({
                filename:'static/style/[name].[contenthash].css'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                minChunks: function (module) {
                    return module.context && /\.js$/.test(module.resource) && module.context.indexOf('node_modules') !== -1
                }
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: "manifest",
                minChunks: Infinity,
                chunks:['common']
            }),
        ]
    },
    setCss(){
        let css = ExtractTextWebpackPlugin.extract({
            fallback:'vue-style-loader',
            use:["css-loader",
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
            ]
        })

        let scss = ExtractTextWebpackPlugin.extract({
            fallback:'vue-style-loader',
            use:["css-loader",
                {
                    loader:'postcss-loader',
                    options:{
                        sourceMap:true
                    }
                },
                {
                    loader:'sass-loader',
                    options:{
                        sourceMap:true
                    }
                },
            ]
        })

        return {css,scss}
    }
}