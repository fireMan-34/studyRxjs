import { EventEmitter } from 'events';
import type { AddEventListenerOptions, EventListenerObject, EventListenerOptions, HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

export class RxjsEvent<T = unknown> extends EventEmitter implements HasEventTargetAddRemove<T> {

  static isOptions(val: unknown): val is AddEventListenerOptions | EventListenerOptions {
    return typeof val === 'object';
  };

  static isOnce(val: unknown): boolean {
    return !!(this.isOptions(val) && val.once);
  }

  addEventListener(type: string, listener: ((evt: T) => void) | EventListenerObject<T> | null, options?: boolean | AddEventListenerOptions | undefined): void {
    const isOnce = RxjsEvent.isOnce(options);

    if (isOnce) {
      super.once(type, listener as any);
    }
    else {
      super.addListener(type, listener as any);
    }
  }
  removeEventListener(type: string, listener: ((evt: T) => void) | EventListenerObject<T> | null, options?: boolean | EventListenerOptions | undefined): void {
    super.removeListener(type, listener as any);
  }
}