import _ from 'lodash';
import fs, { readFile } from 'fs';
import ora from 'ora';
import shell from 'shelljs';
import prettier from 'prettier';

/**
 * 重写text文本段, 行首行尾去空格
 * 函数重载
 */
function text(text: TemplateStringsArray, ...values: any[]): string;
function text(text: string): string;
function text(text: any, ...values: any) {
    let txt = typeof text === 'string' ? text : String.raw(text, ...values);
    txt = txt.replace(/\\n/g, '\n');
    txt = txt.replace(/(^\s*)|(\s*$)/gm, '');
    return txt;
}

class Utils {
    // 文本缩进
    text = text;

    /**
     * 判断一个文件是否存在
     */
    existPath(path: string) {
        return fs.existsSync(path);
    }

    // 文本环绕
    textWrap(text: string, sign?: string) {
        let sign_ = sign || `------------------------------------------`;
        return `${sign_}\n${text}\n${sign_}`;
    }

    // 进度条
    loading(fn: () => any) {
        const spinner = ora('Loading').start();
        fn && fn();
        setTimeout(() => spinner.stop(), _.random(100, 500));
    }

    // 读取JSON文件
    loadJSON(path: string) {
        try {
            return require(path);
        } catch (e) {
            throw new Error(e);
        }
    }

    // 判断当前路径为mri项目，并在根目录下
    mri() {
        return fs.existsSync('.mritemp');
    }

    // 美化代码
    prettier(content: string | any, type: string = 'json') {
        return prettier.format(content, { semi: false, parser: 'json' });
    }

    /**
     * 根目录判断
     *
     * 根目录判断规则:
     * .git 文件夹
     */
    root(): boolean {
        return $utils.existPath('.git');
    }

    // 静默执行 shell.exec 命令
    silent(cmd: string) {
        return shell.exec(cmd, { silent: true });
    }

    // 获得 cmd 命令输出值
    stdout(cmd: string) {
        let stdout = shell.exec(cmd, { silent: true }).stdout;
        return _.trim(stdout).replace(/\n$/, '');
    }

    // 读取文件，并回写内容
    writeBack(path: string, fn: (data: string) => string) {
        if (fs.existsSync(path)) {
            let data = fs.readFileSync(path).toString();
            fs.writeFileSync(path, fn(data));
        }
    }
}

const $utils = new Utils();
export default $utils;
