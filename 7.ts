import { interval } from 'rxjs';
import { createConsole } from 'utils/log';

const logger = createConsole({
    prefix: 'class',
    shuffix: '7',
});

async function main() {
    const source$ = interval(3000);
    const subscription1 = source$.subscribe({
        next: (val) => {
            logger.info(
                '--------------------------------',
                 val, 
                 '--------------------------------',);
            if (val === 3) {
                // * 取消当前观察员
                // subscription1.unsubscribe();
                
                // subscription1.remove(subscription1);
            }
        },
    });
    const subscription2 = source$.subscribe({ next: (val) =>{
        logger.info(val);
        if (val === 2) {
            // * 移除管理 订阅器可以统一管理子订阅器的行为
            // subscription2.remove(subscription1);
            subscription2.unsubscribe();
        }
    }});
    subscription2.add(subscription1);
}

main();