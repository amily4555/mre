module.exports = {
    extends: [
        'eslint-config-alloy/typescript',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    plugins: ['prettier'],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // jQuery: false,
        // $: false
    },
    rules: {
        'prettier/prettier': [
            'error',
            {},
            {
                fileInfoOptions: {
                    withNodeModules: true
                }
            }
        ],

        /**
         * typescript-eslint
         */

        // 是否检测空接口
        '@typescript-eslint/no-empty-interface': false,
        // 是否显示声明类成员的访问性
        '@typescript-eslint/explicit-member-accessibility': false,
        // 将代码缩进管理，委托 prettier 进行管理
        '@typescript-eslint/indent': 'off',

        /**
         * eslint
         */

        // 一个声明只允许一个参数
        'one-var': 'off',

        // ts 中不考虑它了 parseInt 的基数
        radix: 'off',

        // 函数括号内换行
        // consistent: 要求每对圆括号一致地使用换行符。如果该对中的一个括号内有换行符，而另一个括号中没有换行符，则会报告错误。
        'function-paren-newline': ['error', 'consistent'],
        // 在函数体内是否可修改函数参数值
        'no-param-reassign': 'warn',
        // 使用void 0 代替 undefined
        'no-void': 'off',
        // URL 中不使用 script
        'no-script-url': 'off',
        // 该规则旨在标记类型转换的较短符号，然后提供一个更加明了的符号。
        // 允许使用简便的方式对值类型进行转换
        'no-implicit-coercion': 'off',
        // 此规则在对象文字的大括号内执行一致的间距，解构赋值和导入/导出说明符。
        // 降维使用花括号
        'object-curly-spacing': ['error', 'always'],
        // 将代码缩进管理，委托 prettier 进行管理
        indent: 'off',
        // 回调最大层数
        'max-nested-callbacks': ['error', 5],
        // 忽略错误回调，必须处理异常现象
        'handle-callback-err': 'off'
    }
};
