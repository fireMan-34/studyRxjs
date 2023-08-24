


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
                    args.unshift(`前缀： ${prefix}`);
                   }
                   if (shuffix) {
                    args.push(`后缀：${shuffix}`);
                   }
                   return Reflect.get(target, p, receiver)(...args);
                }
            };
        },
    })
};