import { Argv as Yargs, default as yargs } from 'yargs';
import { get } from 'lodash/fp';

export const setArgs = (yargs: Yargs) => {
    let [commander] = yargs.argv._;
    return yargs;
};
