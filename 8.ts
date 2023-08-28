import { Subject, of, share, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '8',
});

async function main() {
    // 多播
    const subject = new Subject();
    const source = of(0, 1, 2, 3, 4, 5, 6);

    const subscription = source.pipe(share({
        connector: () => subject,
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
    }));

    subscription.subscribe({
        next: logger.info,
        error: logger.error,
    });
    subscription.subscribe({
        next: (val) => {
            logger.info(val, '2');
        },
        error: logger.error,
    });

    logger.info('--------------------------------');

    // 行为主体
    const behaviorSubject = new BehaviorSubject(0);

    behaviorSubject.subscribe({
        next: logger.info,
        error: logger.error,
    });

    behaviorSubject.next(2);
    behaviorSubject.next(5);
    // 立即调用且有初始值
    behaviorSubject.subscribe({
        next: logger.info,
        error: logger.error,
    });
    behaviorSubject.next(8);

    logger.info('--------------------------------');
    
    const replaySubject = new ReplaySubject(
        // 3
        ); // 最长保持截取长度 无表示所有都观察
    replaySubject.next(0);
    replaySubject.subscribe({
        next: logger.info,
    });
    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    replaySubject.next(4);
    replaySubject.next(5);
    replaySubject.subscribe({
        next: logger.info,
    });

    logger.info('--------------------------------');
    // 订阅最后一次成功的结果，成功后依旧可以调用
    
    const asyncSubjection = new AsyncSubject();
    asyncSubjection.subscribe({ next: logger.info });
    
    asyncSubjection.next(1);
    asyncSubjection.next(2);
    
    asyncSubjection.subscribe({ next: logger.info });
    
    asyncSubjection.next(3);
    asyncSubjection.complete();
    
    asyncSubjection.subscribe({ next: logger.info });

    logger.info('--------------------------------');
    // 无效主题， 我觉得用信号主题会更好 但是信号似乎有长有短，而事件也有对象之分，诚如所言，一切都是非名状

    const noEffectSubject = new Subject<void>();

    noEffectSubject.subscribe({ next: logger.info });

    noEffectSubject.next(); // 原型绑定

    setTimeout(() => noEffectSubject.next(), 1000)
}

main();