module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
  ],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "indent": [2, 2],//缩进风格
    "no-var": 2, //不能用var
    "eqeqeq": ["error", "always", { "null": "ignore" }], // 必须使用全等
    "semi": [2, "always"],
    "no-redeclare": 0, //禁止多次声明同一变量
    "space-after-keywords": [0, "always"],//关键字后面是否要空一格
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],//else关键字要与花括号保持在同一行
    "comma-spacing": ["error", { "before": false, "after": true }],//规定逗号后面必须添加空格
    "curly": ["error", "multi-line"],//规定多行 if 语句的的括号不能省略
    "dot-location": ["error", "property"], //规定点号操作符须与属性需在同一行
    "func-call-spacing": ["error", "never"], //规定函数调用时标识符与括号间不留间隔
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],//规定键值对中冒号与值之间要留空白
    "no-multi-spaces": "error", //规定除了缩进，不要使用多个空格
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }], //规定不允许有连续多行空行且文件头部不允许空行
    "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],//规定对象属性换行时注意统一代码风格(要么都换行，要么都不换)
    "padded-blocks": ["error", { "blocks": "never", "switches": "never", "classes": "never" }],//规则定义代码中不要啊出现多余留白
    "rest-spread-spacing": ["error", "never"],//规定展开运算符与它的表达式间不要留空白
    "semi-spacing": ["error", { "before": false, "after": true }],//规定分号前不留空格，后面留一个空格
    "space-infix-ops": "error",//规定字符串拼接操作符 (Infix operators) 之间要留空格
    "template-curly-spacing": ["error", "never"], //规定模板字符串中变量前后不加空格
    "no-whitespace-before-property": "error", //规定属性前面不能加空格
    "no-const-assign": "error",//规定避免修改使用 const 声明的变量
    "no-undef-init": "error", //规定不要使用 undefined 来初始化变量
    "no-alert": 2,//禁止使用alert confirm prompt
    "no-unused-vars": "error"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
};
