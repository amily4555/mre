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
import * as path from 'path';

const createTemp = () => {
    fs.writeFile('.mritemp', '{}', 'utf8', _.noop);
    $utils.writeBack('.gitignore', (data) => {
        if (data.indexOf('.mritemp') === -1) {
            return `${data}\n.mritemp`;
        }
        return data;
    });
};

export default async function mritemp() {
    /**
     * 根目录判断标准
     * - 根据git特性，若文件夹拥有.git目录，则默认为根目录
     * - 需要用户确认该目录为根目录
     */
    const isTemp = $utils.existPath('.mritemp');
    const isGit = $utils.existPath('./.git');

    if (!isTemp) {
        if (isGit) {
            createTemp();
        } else {
            const answer = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'root',
                    message: '确认: 当前目录是否为项目的根目录'
                }
            ]);

            if (answer.root) {
                createTemp();
            }
        }
    }
}
