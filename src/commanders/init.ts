import $utils from '../services/utils';
import $log from '../services/log';
import * as inquirer from 'inquirer';
import { createMritemp } from '../handlers/mritemp';
import initGit from '../handlers/init-git';
import { Argv } from 'yargs';
import systemCheck from '../handlers/system-check';

const command = 'init';
const describe = '提交git commit信息';
const builder = (yargs: any) => {
    return yargs
        .usage($utils.text`- mre git commit [message]\n - 提交git commit信息`)
        .demandCommand(0)
        .showHelpOnFail(true);
};

const handler = async function(args: Argv) {
    $log.Scene`
        - mre init
        - MRI 项目初始化
    `;

    /**
     * mri init 适用于文件夹生成 mri project
     * - 系统检测(node, npm, yarn 版本检测)
     * - 确认当前目录为根目录
     * - git init
     * - 生成 mrirc 分支
     * - 生成 test 分支 (测试分支)
     * - 生成 review 分支 (code review 分支)
     * - 生成 .mritemp 临时信息文件 (存储临时信息)
     * - 生成 相关配置文件（eslint, prettier, tsconfig, stylelint 等)
     * - 生成 mri 文件结构
     * - 安装相关包
     */

    // - 系统检测
    systemCheck();

    // - 确认当前目录为根目录
    let questions = [];

    if (!$utils.root()) {
        questions.push({
            type: 'confirm',
            name: 'root',
            default: false,
            message: '确认: 当前目录是否为项目的根目录'
        });
    }

    if (questions.length) {
        const answer = await inquirer.prompt(questions);

        if (!answer.root) {
            $log.Error('请切换至项目根目录\n mri init 仅在根目录下运行');
            process.exit(0);
        }
    }

    $utils.loading(() => {
        // - git init
        initGit();

        // -> 创建 .mritemp 文件
        createMritemp();

        // -> 创建 初始化 安装依赖包
    });
};

module.exports = { command, describe, builder, handler };
