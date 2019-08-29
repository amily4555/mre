/**
 * 系统检测
 *
 * - 判断系统是否安装基本工具 git，node, npm, yarn
 * - 判断基本工具的版本是否为要求版本
 * - 版本要求：
 *   # 保证工具版本一致(package.json 的工具包版本也要求一致)
 *   # 能避免在研发或生产因为工具版本不一致产生的奇怪问题
 *   # 也能避免因为工具版本升级而造成因为工具版本升级而不向下兼容产生的问题
 *   # 半年或一年升级一次所依赖的工具版本
 */

import mu from 'mzmu';
import semver from 'semver';
import $utils from '../services/utils';
import $log from '../services/log';

export default function systemCheck() {
    let versionMap = {
        node: ['12.8.1', '-v', /(\d{1,2}\.\d{1,2}\.\d{1,2})/],
        npm: ['6.10.2', '-v'],
        yarn: ['1.16.0', '-v'],
        git: ['2.22.0', '--version', /(\d{1,2}\.\d{1,2}\.\d{1,2})/]
    };

    // 获得当前系统工具版本

    let vaild = true;

    mu.each(versionMap, (info: any[], name: string) => {
        const [version, method, regx] = info;

        // 获得当前工具版本
        let ver = $utils.stdout(`${name} ${method}`) || '0.0.0';

        // 处理版本号
        if (regx) {
            ver = (ver.match(regx) || [])[0];
        }

        let cvaild = semver.gte(ver, version);

        if (!cvaild) {
            vaild = false;
            if (ver === '0.0.0') {
                $log.error(`${name} 未安装，请安装 ${name}@${version}`);
            } else {
                $log.error(`${name} (${ver}) 低于支持版本v${version}, 请升级版本`);
            }
        }
    });

    if (vaild) {
        process.exit(0);
    }
}
