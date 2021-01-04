module.exports = {
    //打包是否生成.map文件
    productionSourceMap: false,
    //修改或新增html-webpack-plugin的值，在index.html里面能读取htmlWebpackPlugin.options.title
    chainWebpack: config => {
        config.plugin('html').tap(item => {
            item[0].title = 'Cookies-Music';
            return item;
        });
    }
};
