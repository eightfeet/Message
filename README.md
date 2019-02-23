### case
```javascript
    var newMessageA = new ___Message___({
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
    var newMessageB = new ___Message___({
        directionFrom: 'top', // 顶部位置
        style: { 
            wrap: {
                bottom: '15em'
            },
            main: {}
        }
    });

    var btn = document.getElementById('example');
    var btnshow = document.getElementById('show');
    var btnremove = document.getElementById('remove');

    function createA(){ 
        return newMessageA.create('MA-创建', null, true).then(function(){
            console.log('do...');
        });
    }

    function createB(){ 
        return newMessageB.create('MB-创建', null, true).then(function(){
            console.log('do...');
        });
    }

    btnshow.onclick = function() {
        newMessageA.show('A');
        newMessageB.show('B');
    }

    btnremove.onclick = function() {
        newMessageA.remove('A');
        newMessageB.remove('B');
    }

    btn.onclick = function(){
        createB();
        createA();
    }
```
