import _ from 'lodash';
import fs, { readFile } from 'fs';

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

    writeBack(path: string, fn: (data: string) => string) {
        if (fs.existsSync(path)) {
            let data = fs.readFileSync(path).toString();
            fs.writeFileSync(path, fn(data));
        }
    }
}
const $utils = new Utils();
export default $utils;
