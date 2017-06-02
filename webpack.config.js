var path = require('path');
//Html自动生成
var htmlWebpackPlugin=require("html-webpack-plugin");
module.exports = {
    //entry,入口文件，如果是单页面应用，只配置一个接口就可以了，如果是多个页面，就得这么写了：
    //这里根据不同的入口文件生成多个编译文件，需要配合output的filename文件名称不能写死，根据我们文件命名。
    // entry:{
    //     page1:'',
    //     page2:'',
    //     page3:''
    // },
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js'
    },
    module:{
      loaders:[
          {
              test:/\.js$/,
              loader:'babel-loader',
              //exclude->排除node_moudle,这里的path.resolve是使用node.js的解析API，把当前的相对路径转换为绝对路径
              exclude:path.resolve(__dirname,'./node_modules'),
              include:path.resolve(__dirname,'./src'),
              query:{
                  presets:["latest"]
              }
          },
          {
              test:/\.css$/,
              use: [
                  'style-loader',
                  {
                      loader: 'css-loader',
                      options: {importLoaders: 1}
                  },
                  //postcss,这里主要使用postcss里的插件autoprefixer(自动补充浏览器前缀)
                  {
                      loader: 'postcss-loader',
                      options: {
                        plugins: function() {
                            return [
                                require('postcss-import'),
                                require('autoprefixer')({broswers:['last 5 versions']})
                            ]
                        }
                      }
                  }
              ]
          },
          {
              test:/\.less$/,
              use: [
                  'style-loader',
                  {
                      loader: 'css-loader',
                      options: {importLoaders: 1}
                  },
                  //postcss,这里主要使用postcss里的插件autoprefixer(自动补充浏览器前缀)
                  {
                      loader: 'postcss-loader',
                      options: {
                          plugins: function() {
                              return [
                                  require('postcss-import'),
                                  require('autoprefixer')({broswers:['last 5 versions']})
                              ]
                          }
                      }
                  },
                  'less-loader'
              ]

          },
      //    sass与less配置相同，因为webpack版本问题，导致配置方式也有所不同
          {
              test:/\.html$/,
              loader:'html-loader'
          },
          {
              test:/\.(jpg|png|gif|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
              loaders:[
                  'url-loader?limit=10000&name=image/[name].[ext]',
                  'image-webpack-loader'
              ]
          }
      ]
    },
    plugins:[
        //这里是html插件，根据入口文件，生成对应的html文件。html文件自动引入编译后的文件
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject:'body',
            //chunks:['page1'],chunks:['page2'],chunks:['page3']这个属性配置html引入对应的编译文件
        }),
    ]
};