# html-to-objects
一个轻量级的JavaScript html文档解析器，将html文档转换为JavaScript对象

## Install
```js
npm install html-to-objects --save
```
## Usage

```js
const htmlToObjects = require('html-to-objects')
const htmlDocument = `<style>
    .app{
        font-size: 12px;
        color: #fff;
    }
    .photo-box{
        display: flex;
        width: 100px;
        height: 100px;
    }
    .photo-box img{
        width: 100%;
        height: 100%;
    }
</style>
<div class="app">
    <a href="#" class="photo-box">
        <img src="http://127.0.0.1" alt="用户头像" />
    </a>
</div>
`
const result = htmlToObjects(htmlDocument)
// 打印
console.log(result)
```
