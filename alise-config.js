/*
* 用作idea识别@符号能够索引到指定文件
* */

const path = require('path')

module.exports = {
    context: path.resolve(__dirname, './'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname),
        }
    }
}
