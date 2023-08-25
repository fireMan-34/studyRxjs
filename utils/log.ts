


interface ICreateConsoleOptions {
    prefix?: string,
    shuffix?: string,
}
export const createConsole = (options: ICreateConsoleOptions) => {
    return new Proxy(console, {
        get(target, p, receiver) {
            return (...args) => {
                const wrapperFix: (keyof typeof console)[] = [ 'log', 'warn', 'error', 'info']
                if (typeof p === 'string' && wrapperFix.includes(p as keyof typeof console)) {
                   const { prefix, shuffix } = options;
                   if (prefix) {
                    args.unshift(`\n 前缀： ${prefix}\n`);
                   }
                   if (shuffix) {
                    args.push(`\n 后缀：${shuffix}\n`);
                   }
                }
                return Reflect.get(target, p, receiver)(...args);
            };
        },
    })
};