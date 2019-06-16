module.exports = {
    //mod 为github，为gh-pages分支编译
    publicPath: process.env.VUE_BRANCHES === 'gh-pages' ? '/social-vertex-website/': '/social-vertex-website/dist/',
};
