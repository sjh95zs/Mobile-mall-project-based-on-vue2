const path = require('path')
const webpack = require('webpack')
//这是启动热更新的第二步
const htmlWebpackPlugin = require('html-webpack-plugin')
//导入在内存中生成HTML页面的插件
// 这个插件的两个作用
//1.自动把内存中根据指定页面生成一个内存的页面
//2.自动，把打包好的bundle.js追加到页面中去

module.exports = {
    //这个配置文件，起始就是一个js文件，通过Node中的模块操作，向外暴露了一个配置对象

    entry: path.join(__dirname,'./src/index.js'),
    //入口，表示，要使用webpack打包哪个文件

    output: {
        //输出文件相关配置
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js' //这是指定输出文件的名称

    },
    devServer: {
        //这是配置dev-server命令参数的第二种形式，相对来说，这种方式麻烦一些
        open: true, //自动打开浏览器
        port: 3000, //设置启动的端口
        contentBase: 'src', //指定托管的根目录
        hot: true //启动热更新 的 第一步

    },
    plugins: [
        //webpack中带s必然是个数组
        //配置插件的节点
        new webpack.HotModuleReplacementPlugin(),
        //new 一个热更新的模块对象 这是热更新的第三步
        new htmlWebpackPlugin({
            //创建一个在内存中生成html页面的插件
            //指定一个模板页面生成一个内存中的页面
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html' //指定生成的页面名称
        }),
    ],
    resolve:{
        alias:{  //设置vue被导入时包的路径
            'vue$': 'vue/dist/vue.js'
        }
    },
    module:{
        //这个节点用于配置所有的第三方模块加载器
        rules:[
            //所有的第三方文件
            { test: /\.css$/, use: ['style-loader','css-loader']},
            { test: /\.less$/, use: ['style-loader', 'css-loader','less-loader']},
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            /**
             * 注意：css-loader这个loader的作用是用来让main.js文件加载该css文件，而style-loader的作用是将模块的导出作为样式添加到 DOM 中。
             * 这里可能有人会有疑问：按这样的作用来讲的话应该先加载文件再作为样式添加到DOM中去才对，那数组中的顺序应该不是这样的。
             * 我在这里很明确的告诉你，你的想法是没有错的，只是webpack他这一点非常的奇特，它是从数组的最后一个元素，从右到左的顺序加载loader的。
             */
            //配置处理.css文件的第三方loader规则
            { test: /\.vue$/, use: 'vue-loader'}, //处理.vue文件的loader
            { test: /\.js$/, use: 'babel-loader',exclude:/node_modules/}, //  注意:在配置babel的loader规则的时候，必须把node_moudules目录，通过exclude选项排除掉，原因有两个，
            //1. 如果不排除node_modules，则babel会把node_modules中所有的第三方js文件都打包编译，这样非常消耗cpu，同时打包速度非常慢
            //2. 哪怕，最终babel把所有node_modules中的Js都转换完毕了，但是，项目也无法正常运行  
            //.babelrc是json格式的，必须要按着json格式写指令,persets:可以认为是babel的语法
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader' }, // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' } // 处理 字体文件的 loader 
        ]
    }
}

//当我们在控制台，直接输入webpack命令执行的时候，webpack做了一下几步
//1.首先，webpack发现，我们并没有通过命令的形式，指定入口和出口
//2.webpack就会去项目的根目录中，查找一个叫做`webpack.config.js`的配置文件
//3.当找到配置文件后，webpack会去解析执行这个配置文件，当解析执行配置文件后，就得到了配置文件中导出的配置对象
//4.当webpack拿到了配置对象后，就拿到了配置对象中指定的入口和出口，然后进行打包构建

//如果打包报出`Module build failed: Error: Plugin/Preset files are not allowed to export objects`和`Error: .plugins[0][1] must be an object, false, or undefined`的类型错误，请注意babel的版本号