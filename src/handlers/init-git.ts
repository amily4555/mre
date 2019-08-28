import $utils from '../services/utils';
import $log from '../services/log';
import shell from 'shelljs';

export default function initGit() {
    if (!$utils.existPath('.git')) {
        $utils.silent(`git init`);

        /**
         * 判断是否读到用户信息
         */
        const name = $utils.stdout(`git config user.name`);
    }
}
