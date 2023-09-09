import { BehaviorSubject, of, takeUntil, take, first } from 'rxjs';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '13',
});

async function main() {
    const $o = of(0, 3, 8, 7);
    const $bo = new BehaviorSubject(2);



    // $bo.subscribe({ next: logger.info });
    // $bo.pipe(take(3)).subscribe({ next: logger.info });
    $bo.pipe(first((val) => val !== 2 && val > 0)).subscribe({ next: logger.info });

    $o.subscribe({
        next(val) {
            $bo.next(val);
        }
    });


}

main();