/**
 * 创建MRI temp文件 .mritemp
 * .mritemp
 * - 存储mri运行中的临时信息
 * - 以及标注为项目的根目录
 * - 该文件写入.gitignore
 */
import $utils from '../services/utils';
import * as inquirer from 'inquirer';
import * as fs from 'fs';
import _ from 'lodash';
import { shell } from '../index';

const writeMritemp = () => {
    fs.writeFile(
        '.mritemp',
        JSON.stringify({
            pwd: process.cwd()
        }),
        'utf8',
        _.noop
    );

    shell.touch('.gitignore');

    $utils.writeBack('.gitignore', (data) => {
        if (data.indexOf('.mritemp') === -1) {
            return `${data}\n.mritemp`;
        }
        return data;
    });
};

export const createMritemp = async () => {
    /**
     * 根目录判断标准
     * - 根据git特性，若文件夹拥有.git目录，则默认为根目录
     * - 需要用户确认该目录为根目录
     */
    const isTemp = $utils.existPath('.mritemp');
    if (!isTemp) {
        writeMritemp();
    }
};

async function mritemp(key?: string, value?: any) {
    let nilKey = _.isUndefined(key);
    let nilValue = _.isUndefined(value);
    let path = '.mritemp';

    let temp = $utils.loadJSON(path);

    if (nilKey && nilValue) {
        return temp;
    } else if (nilValue || nilKey) {
        _.set(temp, key as string, value);
        let content = $utils.prettier(JSON.stringify(temp));
        fs.writeFileSync(path, content);
    } else {
        return temp[key as string];
    }
}

export default mritemp;
