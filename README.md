# Message

弱提示模块，需要promise polyfill
<a href="http://www.eightfeet.cn/Message/dist/index.html" traget="_blank" >demo</a>

```sh
npm i @eightfeet/message -S
```

```javascript
import Message from '@eightfeet/message';

const myMessage = new Message();

myMessage.create('A message!').then(() => console.log('已经完成弱提示'));
```



#### parame

| 参数          | 说明                           | 是否必填 | 备注                                                         | 类型   |
| ------------- | ------------------------------ | -------- | ------------------------------------------------------------ | ------ |
| id            | 所创建弱提示的id               | 否       | 不传可自动生成id（message + 时间戳 + 100以内的随机数）       | String |
| zIndex        | message的样式层级关系          | 否       | 默认10000                                                    | Number |
| emBase        | em单位的基准像素               | 否       | 默认自动计算（emBase = document.clientWidth/24）             | Number |
| parentId      | 所挂载的父级ID用于做局部弱提示 | 否       | 默认挂在body下面，指定父级dom时将挂载在父级dom下，配合css实现局部弱提示 | String |
| directionFrom | 入场方向                       | 否       | top，bottom。默认top                                         | String |
| style         | 定义弱提示样式                 | 否       | {<br />    wrap: 外包裹<br />    main: 弱提示内容<br />}     | Object |



#### options

1. ##### create: ƒ (content, time, noRemoval) 创建message

   **content** String 提示内容。

   **noRemoval** Boolean 关闭弹窗时是否移除message Dom。 false移除，true保留。

2. ##### hide: ƒ (noRemoval) 隐藏弹窗

   **noRemoval** Boolean 关闭弹窗时是否移除弹窗Dom。 false移除，true保留。

3. ##### remove: ƒ () 移除弹窗

   移除，将message从body中移除。

4. ##### show: ƒ () 显示弹窗

   显示页面弹窗，如果创建的弹窗隐藏时，调用此方法显示弹窗。



#### case

```javascript
import Modal from '@eightfeet/Message';

const newMessage = new Message({
        directionFrom: 'top', // 底部位置
        style: { 
            wrap: {
                top: 'auto'
            },
            main: {
                backgroundColor: 'red'
            }
        }
    });

    const btn = document.getElementById('exampleBtn');

    btn.onclick = function(){ 
        return newMessage.create('Message', true).then(function(){
            document.getElementById('btnShow').onclick = function(){
                return newMessage.show('true');
            };
        });
    }
    
```
