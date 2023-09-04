import { AsyncSubject, BehaviorSubject ,lastValueFrom, firstValueFrom, take } from 'rxjs';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '10',
});

async function main() {
    try {
        // const asyncSubject = new AsyncSubject<number>();
        const asyncSubject = new BehaviorSubject<number>(0);
        asyncSubject.next(1);
        lastValueFrom(asyncSubject).then((value: number) => { console.log('promise last 返回的观察值:', value) })
        .catch(logger.error);
        firstValueFrom(asyncSubject).then((value: number) => { console.log('promise first 返回的观察值:', value) })
        .catch(logger.error);
        asyncSubject.next(2);
        lastValueFrom(asyncSubject.pipe(take(1))).then((value: number) => { console.log('promise take 返回的观察值:', value) })
        asyncSubject.next(3);
        asyncSubject.subscribe((value: number) => { logger.info('订阅变化:', value)  });
        asyncSubject.next(4);
        // asyncSubject.complete();
    } catch (err) {
        logger.error(err);
    };
    console.log('执行成功')
};

main();