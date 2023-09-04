import { interval, firstValueFrom, lastValueFrom, take, last, Subject } from 'rxjs';
import { createConsole } from 'utils/log';
import { sleep } from 'utils/fun';

const logger = createConsole({
    prefix: 'class',
    shuffix: '12',
});

async function main() {
    const source$ = new Subject();

    interval(1000).subscribe((val) => source$.next(val));

    await sleep(3000);

    const value  = await firstValueFrom(source$);

    logger.info(value);

    source$.subscribe({
        next(value) {
            // logger.info('观察值', value)
        },
    });
}

main();