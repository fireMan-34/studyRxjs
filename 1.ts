import { fromEvent, map, scan, throttleTime } from 'rxjs';
import { RxjsEvent } from './utils/ev';
import { sleep } from './utils/fun';

console.log('rx Js 重新 学习 第一课');



/**
 * * ReactiveX 结合了 观察者模式、迭代器模式 和 使用集合的函数式编程，以满足以一种理想方式来管理事件序列所需要的一切。
 * * Observable 可观察对象 (这个概念是一个可调用的未来值或事件的集合)
 * * Observer (观察者): 一个回调函数的集合，它知道如何去监听由 Observable 提供的值。
 * * Subscription (订阅): 表示 Observable 的执行，主要用于取消 Observable 的执行。
 * * Operators (操作符): 采用函数式编程风格的纯函数 (pure function)，使用像 map、filter、concat、flatMap 等这样的操作符来处理集合。
 * * Subject (主体): 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
 * * Schedulers (调度器): 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他。
 */
async function main() {
  const rxjsEventEmit = new RxjsEvent({});
  const eventName = 'rxjs';
  const observable = fromEvent(rxjsEventEmit, eventName);
  interface RxEmitEvent {
    eventName: string;
    count: number;
  }
  interface RxEmitScanEvent extends RxEmitEvent {
    total: number;
  }
  const e: RxEmitEvent = { eventName, count: 0 };
  observable
    .pipe(
      /**  
       *  * 流动性 (Flow)
      */
      throttleTime(1000),
      /** 
       *  * 纯净性 (Purity)
       */
      map<RxEmitEvent, RxEmitEvent>((value: RxEmitEvent, i) => ({ ...value, count: value.count + i })),
      scan<RxEmitScanEvent, RxEmitEvent>((acc, val,) => ({ ...acc, total: val.count + acc.count, })),
    )
    .subscribe({
      next: console.log,
      error: console.error,
      complete: console.log,
    });
  rxjsEventEmit.emit(eventName, e);
  rxjsEventEmit.emit(eventName, e);
  
  await sleep(900);
  rxjsEventEmit.emit(eventName, e);
  await sleep(200);
  rxjsEventEmit.emit(eventName, e);
}

main();