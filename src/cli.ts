import * as yargs from 'yargs';
import { setArgs } from './config/config';

export const run = (env: string) => {
    return (
        yargs
            .commandDir('./commanders', {
                // commandDir默认只会加载目录下第一级的文件，不会递归加载
                recurse: true,

                // 开发环境使用 ts，需指定
                extensions: env === 'dev' ? ['ts', 'js'] : ['js']
            })
            // .command('*', '错误命令提示', {}, (argv) => {
            //     console.debug(argv);
            //     console.error(`mre ${argv._.join(' ')} 不存在或错误`);
            // })
            .demandCommand()
            .showHelpOnFail(true)
            .recommendCommands()
            .parse()
    );
};
