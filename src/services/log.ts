import chalk from 'chalk';
import $utils from './utils';
import _ from 'lodash';

type Tagged = (text: TemplateStringsArray | string, ...values: any[]) => void;

function print(type: string, color: string, wrap: boolean, text: TemplateStringsArray, ...values: any[]): void;
function print(type: string, color: string, wrap: boolean, text: string): void;
function print(type: string, color: string, wrap: boolean, text: any, ...values: any): void {
    let txt = $utils.text(text, ...values);

    if (wrap) {
        let sign = `------------------------------------------`;
        txt = `${sign}\n${txt}\n${sign}`;
    }

    // @ts-ignore
    console[type](chalk[color](txt));
}

class Log {
    curried = _.curry(print);

    log: Tagged = this.curried('log', 'green', false);
    debug: Tagged = this.curried('debug', 'cyan', false);
    warn: Tagged = this.curried('warn', 'yellow', false);
    error: Tagged = this.curried('error', 'red', false);
    scene: Tagged = this.curried('log', 'magentaBright', false);

    Log: Tagged = this.curried('log', 'green', true);
    Debug: Tagged = this.curried('debug', 'cyan', true);
    Warn: Tagged = this.curried('warn', 'yellow', true);
    Error: Tagged = this.curried('error', 'red', true);
    Scene: Tagged = this.curried('log', 'magentaBright', true);
}

const $log = new Log();

export default $log;
