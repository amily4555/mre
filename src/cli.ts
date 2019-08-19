import * as yargs from 'yargs';
import { setArgs } from './config/config';

export const cli = () => {
    return (
        yargs
            .commandDir('commanders')
            // .command('*', '错误命令提示', {}, (argv) => {
            //     console.debug(argv);
            //     console.error(`mre ${argv._.join(' ')} 不存在或错误`);
            // })
            .demandCommand()
            .showHelpOnFail(true)
            .recommendCommands()
            .strict()
            // .help()
            .epilog('mre - mri-cli_v2')
            .parse()
    );
};
