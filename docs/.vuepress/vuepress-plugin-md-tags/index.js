const { path } = require('@vuepress/shared-utils')

console.log(13123);

module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-md-tags',
  define () {
    return {
      type: options.type || 'rainbow', // 标签预定义样式 rainbow || default
      color: options.color || '#42b983',  // 标签字体颜色
      borderColor: options.borderColor || '#e2faef', // 标签边框颜色
      background: options.background || '#f0faf5', // 标签背景颜色
      selector: options.selector || '.page .content__default h1'
    }
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
})
