


interface ICreateConsoleOptions {
    prefix?: string,
    shuffix?: string,
}
export const createConsole = (options: ICreateConsoleOptions) => {
    return new Proxy(console, {
        get(target, p, receiver) {
            return (...args) => {
                if (typeof p === 'string' && ['log', 'warn', 'error'].includes(p)) {
                   const { prefix, shuffix } = options;
                   if (prefix) {
                    args.unshift(`\n 前缀： ${prefix}\n`);
                   }
                   if (shuffix) {
                    args.push(`\n 后缀：${shuffix}\n`);
                   }
                   return Reflect.get(target, p, receiver)(...args);
                }
            };
        },
    })
};