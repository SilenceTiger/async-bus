# AsyncBus
## 1.安装
`npm install async-bus`

`or`

`yarn add async-bus`
## 2.特性
在使用传统的 `eventBus` 时，发出时间之后，不知道订阅者合适结束动作。 `async-bus` 通过 `emit` 后返回 `Promise` 可以监听订阅返回。
## 3.使用

### 3.1 使用默认导出
```
// 监听函数定义
interface AsyncBusFn {
  (args?: object | string | number, resolve?: Function, reject?: Function): Promise<any> | void;
}
```

```
import asyncBus from 'async-bus'

const handleTest = (args: any) => {
    console.log(args);
};

const handleTest1 = (args: any, resolve: any, reject: any) => {
  setTimeout(() => {
    resolve(args);
  }, 2000);
};

const handleTest2 = (args: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("test2");
    }, 2000);
  });
};


const handleTest3 = () => {
  return fetch("https://www.baidu.com/").then((res) => {
    console.log(args)
    return res;
  });
};

asyncBus.on("test", handleTest);
asyncBus.on("test", handleTest1);
asyncBus.on("test", handleTest2);
asyncBus.on("test", handleTest3);

asyncBus
  .emit("test", {
    msg: "abc",
  })
  .then((res) => {
    // 等待四个订阅者执行完毕之后执行
    // 返回 Promise.all
    console.log(res);
  })
  .catch((err) => {
    // 执行出错 订阅者reject或者超时
    console.log(err);
  });

```

### 3.2 使用类
set timout in your async-bus
```
import { AsyncBus } from 'async-bus'

const ab = new AsyncBus(5000) 

export default ab

```
