import { Observable } from 'rxjs';
import type { Subscriber } from 'rxjs';
import { sleep } from 'utils/fun';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '2',
});

async function main() {
    let s: Subscriber<string>;
    const observable = new Observable((subscriber) => {
       s = subscriber;
    });
    observable.subscribe({
        next: logger.log,
        error: logger.error,
        complete: () => logger.log('complete'),
    });
    s.next('haha');
    
    await sleep(1000);
    s.next('12345');
    s.complete();
}

main();