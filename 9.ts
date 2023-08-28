import { of, asyncScheduler, observeOn, queueScheduler, asapScheduler, animationFrameScheduler, subscribeOn } from 'rxjs';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '9',
});

async function main() {
    logger.info('Starting');

    const source$ = of(0, 1, 2, 3, 4, 5, 6, 7, 8, 
        // * 静态操作符 通常最后一个参数是可选 如果为调度子类 则会执行，否则填充默认调度
        // asyncScheduler
        )
    .pipe(
        // * 添加异步调度
        // observeOn(asyncScheduler),
        // * 添加微任务异步时序
        // observeOn(asapScheduler),
        // * 添加同步时序
        // observeOn(queueScheduler),
        // * 添加重绘前时序 通常用于动画
        // observeOn(animationFrameScheduler),
        );
        // source$.subscribe({ next: logger.info })
        source$.pipe(
            // 通知阶段发生的
            // observeOn(null),
            // 订阅阶段发生的
            subscribeOn(asyncScheduler),
        ).subscribe({ next: logger.info });

    of(0, 1, 2, 3, 4, 5)

    logger.info('Ending');
    }
    
main();