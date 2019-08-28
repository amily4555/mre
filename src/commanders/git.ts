let command = 'git <command>';

export const desc = 'github command list';

export const builder = function(yargs: any) {
    return yargs.commandDir('git');
};

export const handler = function(argv: any) {
    console.debug('::::: git');
};
