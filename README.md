# htmlToModelObject
一个轻量级的JavaScript html文档解析器，将html文档转换为JavaScript对象

## Install
```js
npm install html2object --save
```
## Usage

```js
const htmlToObject = require('html2object')
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
const result = htmlToObject(htmlDocument)
// 打印
console.log(result)
```
