import * as yargs from 'yargs';
import $utils from '../../services/utils';
import $log from '../../services/log';

exports.command = 'commit';

exports.desc = '提交git commit信息';

exports.builder = (yargs: any) => {
    return yargs
        .usage($utils.text`- mre git commit [message]\n - 提交git commit信息`)
        .demandCommand(1)
        .showHelpOnFail(true);
};

exports.handler = function(argv: any) {
    $log.Scene`
        - mre git commit [message]
        - 提交 git commit 信息
    `;
};
