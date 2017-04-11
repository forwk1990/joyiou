function HelloWorldPlugin(options) {
    // 使用配置（options）设置插件实例
}

HelloWorldPlugin.prototype.apply = function (compiler) {
    compiler.plugin("compile", function (params) {
        console.log("The compiler is starting to compile...");
    });

    compiler.plugin("compilation", function (compilation) {
        console.log("The compiler is starting a new compilation...");

        compilation.plugin("optimize", function () {
            console.log("The compilation is starting to optimize files...");
        });
    });

    compiler.plugin("emit", function (compilation, callback) {
        let existIndexJsp = false
        for (var filename in compilation.assets) {
            if(filename == 'index.jsp'){
                existIndexJsp = true
                break
            }
        }

        if(existIndexJsp){
            compilation('index.jsp')
        }

        callback();
    });

    compiler.plugin('after-emit', function (compilation) {

    })

    compiler.plugin('done', function (stats) {

    })
};

module.exports = HelloWorldPlugin;