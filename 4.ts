import { of, first, map, Observable, concatAll } from 'rxjs';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '4',
});

/** 操作符两大类
 * *  observableInstnace.pipe(operator) input observablestance => new observableInstnace
 * * observableInstnace.pipe(operatorFactory) create Context to customize input observablestance => new observableInstnace is Strong effect
 */
async function main() {
    const source$ = of(2,3,4,5);
    source$
    .pipe(first())
    .subscribe(logger.log);


    source$
    .pipe(map((n => n ** n)))
    .subscribe(logger.log);

    const customSource$ = (observable: Observable<unknown>) => {
        const source$ = new Observable((subscriber) => {
          const subscription =  observable.subscribe({
            next: (val) => {
                logger.info(val, '自定义管道');
                subscriber.next(val);
            },
            error(err) {
                logger.error(err, '自定义管道');
                subscriber.error(err);
            },
            complete() {
                logger.info('自定义管道结束');
            },
          })  ;
          return () => {
            logger.info('自定义释放资源');
            subscription.unsubscribe();
          }
        });
        return source$;
    };
    const customSource1$ = () => customSource$;
    // 当有订阅者的时候 观察源才开始传递数据
    source$
    .pipe(customSource$, customSource1$())
    .subscribe(logger.info);


    logger.info('操作符知识');
}

main();