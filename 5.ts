import { Observable, of, map, concatAll, mergeAll, switchAll, exhaustAll } from 'rxjs';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '5',
});

async function main() {
    logger.info('高阶可观察量');
    
    const createRandomValue = (count: number) => {
        return new Observable((subscriber) => {
            subscriber.next(count);
            return () => {
                subscriber.unsubscribe();
            };
        });
    };

    of(3, 5, 5)
    .pipe(
        map(createRandomValue),
        // 订阅 observables 传递 值 
        /** concatAll()运算符订阅来自“外部”Observable 的每个“内部”Observable，并复制所有发出的值，直到该 Observable 完成 */
        concatAll(),
    ).subscribe((...args) => logger.info(...args, 'concatAll'));
    of(3, 5, 2, )
    .pipe(
        map(createRandomValue),
        /** 
         * 在每个内部 Observable 到达时订阅它，然后在每个值到达时发出它
         */
        mergeAll(),
    ).subscribe((...args) => logger.info(...args, 'mergeAll'));
    of(2.8,4)
    .pipe(
        map(createRandomValue),
        /** 
         * 当第一个内部 Observable 到达时订阅它，并在它到达时发出每个值，但当下一个内部 Observable 到达时，取消订阅前一个，并订阅新的。
         */
        switchAll(),
    ).subscribe((...args) => logger.info(...args, 'switchAll'));
    of(9, 8)
    .pipe(
        map(createRandomValue),
        /** 
         *  当第一个内部 Observable 到达时订阅它，并在每个值到达时发出它，丢弃所有新到达的内部 Observable，直到第一个内部 Observable 完成，然后等待下一个内部 Observable
         */
        exhaustAll(),
    ).subscribe((...args) => logger.info(...args, 'exhaustAll'));
}

main();