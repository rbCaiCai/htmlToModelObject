
const htmlToObject = require('../index.js')
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
console.log(htmlToObject(htmlDocument))