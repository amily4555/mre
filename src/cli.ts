import * as yargs from 'yargs';
import { setArgs } from './config-cli/config';

export const cli = () => {
    return yargs
        .command('init', '初始化系统', setArgs, (argv) => {
            console.debug('--- init', argv);
        })
        .command('dev', '启动系统', setArgs, (argv) => {
            console.debug('--- dev', argv);
        })
        .demandCommand()
        .help()
        .epilog('mre - mri-cli_v2').argv;
};
