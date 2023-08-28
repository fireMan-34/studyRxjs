import { 
    // * 创建操作
    from, 
    of, 
    bindCallback, 
    defer, 
    empty, 
    fromEvent, 
    fromEventPattern, 
    generate, 
    interval, 
    range, 
    throwError, 
    iif,  

    // * 连接创建操作符
    combineLatest,
    concat,
    forkJoin,
    merge,
    partition, // * 转换操作符 同
    race,
    zip,

    // * 转换操作符
    buffer,
    bufferCount,
    bufferTime,
    bufferToggle,
    bufferWhen,
    concatMap,
    concatMapTo,
    expand,
    groupBy,
    map,
    mapTo,
    mergeMap,
    mergeMapTo,
    mergeScan,
    pairwise,
    pluck,
    scan,
    switchScan,
    switchMap,
    switchMapTo,
    window,
    windowCount,
    windowTime,
    windowToggle,
    windowWhen,

    // * 过滤操作符
    audit,
    auditTime,
    debounce,
    debounceTime,
    distinct,
    distinctUntilChanged,
    distinctUntilKeyChanged,
    elementAt,
    filter,
    first,
    last,
    sample,
    sampleTime,
    single,
    skip,
    skipLast,
    skipUntil,
    skipWhile,
    take,
    takeLast,
    takeUntil,
    takeWhile,
    throttle,
    throttleTime,

    //* 连接操作符
    combineLatestAll,
    concatAll,
    exhaustAll,
    mergeAll,
    switchAll,
    withLatestFrom,

    //* 组播操作符
    multicast,
    publish,
    publishBehavior,
    publishLast,
    publishReplay,
    share,

    //* 错误处理运算符
    catchError,
    retry,
    retryWhen,

    //* 工具操作符
    tap,
    delay,
    delayWhen,
    dematerialize,
    materialize,
    observeOn,
    subscribeOn,
    timeInterval,
    timeout,
    timestamp,
    timeoutWith,
    toArray,

    // * 条件 and 布尔符
    defaultIfEmpty,
    every,
    find,
    findIndex,
    isEmpty,

    //* 数学运算 and 聚合运算符
    count,
    max,
    min,
    reduce,

    firstValueFrom, lastValueFrom
} from 'rxjs';
// * 创建操作
import ajax from 'rxjs/ajax';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '6',
});

const asyncRandom = () => Math.random() > .5 
? Promise.resolve({ val: Math.random() })
: Promise.reject({ message: 'Invalid random number' });

/**
 * @url https://rxjs.dev/guide/operators
 * @example
 * 
 * ``` tsx
 * import { from } from 'rxjs';
 * ```
 */
async function main() {
    const createLog = () => {
        let count = 0;
        return {
            complete: () => {
                logger.log('complete %d', count);
                count ++;
            },
            next: logger.info,
            error: logger.error,

        }
    };
    const observerLogger = createLog();
    // Promise 转 Observable
    const observable1 = from(asyncRandom());
    observable1.subscribe(observerLogger);
    observable1.subscribe(observerLogger);
    const observalble2 = firstValueFrom(of(1,2));
    
}

main();