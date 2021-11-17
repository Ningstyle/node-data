# node-data

## node+express后台接口开发框架，开箱即用  

##### public文件夹下是配置或者公用相关文件，例如
##### 项目运行流程：
```
npm install
```
```
npm start
```
##### 启动成功请求：http://localhost:3008/business/test   测试是否成功
##### 1、public/javascripts/config.js是数据库链接相关配置
```javascript
    // mysql数据库连接配置
    const public={host:'',user:"",password:"",port:"3306"}
    const baseMysql ={
      host:public.host,
      user:public.user,
      password:public.password,
      database:'',
      port:public.port
    }
    module.exports ={
      baseMysql
    }
```
##### 2、public/javascripts/mian.js是封装好的一些常用发请求方法，比如列表查询，删除等等...直接引入即可使用：
```javascript
    var mysql = require("mysql");
    const $reruest = require('../../public/javascripts/main.js')
    var $config = require('../../public/javascripts/config.js');
    var pool = mysql.createPool($config.baseMysql);
```
