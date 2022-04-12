# Three Fly Line
## 1.安装
`npm install async-event`

`or`

`yarn add async-event`
## 2.特性
在使用传统的 `eventBus` 时，发出时间之后，不知道订阅者合适结束动作。 `async-event` 通过 `emit` 后返回 `Promise` 可以监听订阅返回。
## 3.使用

### 3.1 使用默认导出
```
import asyncEvent from 'async-event'

const handleTest1 = (args: any) => {
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

asyncEvent.on("test", handleTest);
asyncEvent.on("test", handleTest1);
asyncEvent.on("test", handleTest2);
asyncEvent.on("test", handleTest3);

asyncEvent
  .emit("test", {
    msg: "abc",
  })
  .then((res) => {
    console.log(res);
  });

```

### 3.2 使用类
set timout in your async-event
```
import { AsyncEvent } from 'async-event'

const ae = new AsyncEvent(5000) 

export default ae

```
