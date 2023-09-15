import { first, interval, last, map, mergeMap, take, takeLast, takeUntil, takeWhile, firstValueFrom, ReplaySubject, filter } from 'rxjs';
import { sleep } from 'utils/fun';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '15',
});

async function main() {
    const o$ = interval(3000)
    .pipe(
        map((v) => [v, undefined]),
        mergeMap(v => v),
    );
    const subject = new ReplaySubject();

    o$.pipe(filter((v) => !!v)).subscribe(subject);

    await sleep(3000);

    //* 观察所有序列
    // o$.subscribe({
    //     next: logger.info,
    // })

    //* 获取第一个非 0 空 热序列
    // o$.pipe(first(v => !!v)).subscribe({
    //     next: logger.info,
    // })

    // o$.pipe(
    //     // 不会触发，也是需要完成时
    //     // takeWhile((v) => !!v),
    //     // 不会触发，也是需要完成时
    //     // takeLast(1),
    //     // 不会触发
    //     // last(),
    //     ).subscribe({
    //     next: logger.info,
    // })

    firstValueFrom(subject).then(logger.info);

    // subject.subscribe({
    //     next: logger.info,
    // })
}

main();