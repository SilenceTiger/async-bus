interface AsyncEventFn {
  (args?: object | string | number, resolve?: Function, reject?: Function): Promise<any> | void;
}

export class AsyncEvent {
  private __events: { [key: string]: AsyncEventFn[] } = {};
  private timeout?: number;
  constructor(timeout?: number) {
    this.timeout = timeout || 10000;
  }

  public emit(event: string, args: any): Promise<any[]> | undefined {
    if (!this.__events[event]) return; // 没有注册该消息返回
    let eventFns: AsyncEventFn[] = this.__events[event];
    if (eventFns) {
      let ps: Promise<any>[] = [];
      eventFns.forEach(fn => {
        let p = new Promise((resolve, reject) => {
          let res = fn.call(this, args, resolve, reject); // resolve 永远不执行 timeout
          setTimeout(() => {
            reject('timeout');
          }, this.timeout);
          if (fn.length === 1) {
            resolve(res);
          }
        });
        ps.push(p);
      });

      return Promise.all(ps);
    } else {
      return undefined;
    }
  }

  on(event: string, fn: AsyncEventFn) {
    let eventFns = this.__events[event];
    if (!eventFns) {
      this.__events[event] = [fn];
    } else {
      eventFns.push(fn);
    }
  }

  remove(event: string, fn: AsyncEventFn) {
    let eventFns = this.__events[event];
    if (!eventFns) return;
    let index = eventFns.indexOf(fn);
    if (index >= 0) {
      eventFns.splice(index, 1);
    }
  }

  removeAll(event: string) {
    if (event) {
      delete this.__events[event];
    } else {
      this.__events = {};
    }
  }
}

const asyncEvent = new AsyncEvent();

export default asyncEvent;