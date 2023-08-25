import { Observable } from 'rxjs';
import { sleep } from 'utils/fun';
import { createConsole } from 'utils/log';
import { creatObservableAndSubscribe } from 'utils/rxHelper';

const logger = createConsole({
    prefix: 'class',
    shuffix: '3',
});

async function main() {
   /** 离散管理 */
   const { observable, subscribe, setUnsubscribe }  = creatObservableAndSubscribe();
   
   let count = 0;
   const subscription = observable.subscribe({
    next: (value) =>  logger.log('数据', value),
   });
   const timer = setInterval(() => {
    subscribe.next('当前执行数次' + count);
    if (count === 3) {
       subscription.unsubscribe();
    }
    count ++;
   });
   setUnsubscribe(() => clearInterval(timer));

   /** 集中式管理 */
   const subscription1 = new Observable((subscriber) => {
      
      subscriber.next('2345');
      /** 冷热 Observable 判断 */
      setTimeout(() => {
         subscriber.next('3456');
         subscriber.complete();
      }, 2000)
   });
   subscription1.subscribe({
      next: logger.log
   });

   await sleep(500);

   subscription1.subscribe({
      next: logger.log,
   });
   
}

main();