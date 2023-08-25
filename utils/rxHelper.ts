import { Observable, Subscriber } from 'rxjs';
import { createRefProxy } from 'utils/fun';

/**
 * @name 极简订阅创建对象
 * @returns 
 */
export const creatObservableAndSubscribe = <T>() => {
  let subscribe: { ref: Subscriber<T> } = { ref: null };
  let _unsubscribeRef: { ref: () => void } = {
    ref: () => {},
  };
  const observable = new Observable<T>((subscriber => { 
    subscribe.ref = subscriber;
    return () => _unsubscribeRef.ref();
   }));
   return {
    /** 
     * 可观察对象
     * @name 可观察对象
     * @description 可以添加观察者
     */
    observable,
    /** 
     * 发布订阅对象
     * @name 发布订阅对象
     * @description 可以发布订阅事件
     */
    subscribe: createRefProxy(subscribe),
    /** 设置资源释放器 */
    setUnsubscribe: (callback: () => void | Function) => {
      _unsubscribeRef.ref = callback;
    },
   }
};