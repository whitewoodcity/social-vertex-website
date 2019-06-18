const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // publicPath: "/",
    //mod 为github，为gh-pages分支编译
    publicPath: process.env.VUE_BRANCHES === 'gh-pages' ? '/social-vertex-website/': '/',
    // 输出目录
    outputDir: 'dist',
    lintOnSave: true,
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    // alias 配置
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
        config.module.rules.delete("svg");
        config.module
            .rule('svg-smart')
            .test(/\.svg$/)
            .include
            .add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: '[name]'
            })
    }
}
