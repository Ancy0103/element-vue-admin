module.exports = {
  extends: ["stylelint-config-standard"],
  // processors: ["stylelint-processor-html"],
  rules: {
    indentation: 2, // 指定缩进
    'no-empty-source': null,
    'max-empty-lines': 2, // 限制方法中相邻的空行数
    'max-nesting-depth': 7, // 最大嵌套深度
    'string-quotes': 'single', // 单引号
    'function-url-quotes': 'always', // 单引号
    'at-rule-semicolon-newline-after': null,
    'rule-empty-line-before': null,
  }
};