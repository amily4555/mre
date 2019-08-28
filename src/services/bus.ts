import $utils from './utils';
import $log from './log';

class Bus {
    root() {
        if (!$utils.root()) {
            $log.Error(`MRI命令仅支持在根目录下工作\n`);
            process.exit(0);
        }
    }
}

const $bus = new Bus();
export default $bus;
