import $utils from '../services/utils';
import $log from '../services/log';
import mritemp from '../handlers/mritemp';

exports.command = 'init';

exports.desc = '提交git commit信息';

exports.builder = (yargs: any) => {
    return yargs
        .usage($utils.text`- mre git commit [message]\n - 提交git commit信息`)
        .demandCommand(0)
        .showHelpOnFail(true);
};

exports.handler = (argv: any) => {
    $log.Scene`
        - mre init
        - MRI 项目初始化
    `;

    mritemp();
};
