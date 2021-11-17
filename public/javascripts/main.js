var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var $config = require('../javascripts/config.js');
var pool = mysql.createPool($config.baseMysql);
/******
获取列表通用方法(有分页)
Current:当前页(从0开始)
PageCount:每页条数
dbname:表名
callback:回调函数
ps:不需要分页不用传值，主键字段统一使用id命名
*****/
const getAllUsers=((Current,PageCount,dbname,callback)=>{
	pool.getConnection(function(err, connection) {
      var getAllUsers_Sql ='select * from  '+dbname+'';
      connection.query(getAllUsers_Sql, function(err, result) {
          if (err) {
              console.log("getAllUsers Error: " + err.message);
              return;
          }else{
          	var total = result.length//总条数
          	console.log(Current,PageCount)
          	if(Current!=''&&PageCount!=''){
	          	var startPage = parseInt(Current)*parseInt(PageCount);
	          	var pages = Math.ceil(total/PageCount);//总页数
						  pool.getConnection(function(err, connection) {
						      var total_Sql ='select * from '+dbname+' limit ?,?';
						      connection.query(total_Sql,[startPage,parseInt(PageCount)], function(err,result) {
						          if (err) {
						              console.log("total_Error: " + err.message);
						              return;
						          }
						          connection.release();
						          callback(err,total,pages,result,PageCount);

						      });
						  });
          	}else{
          		connection.release();
          	  callback(err,total,'',result,'');
          	}          	
          }
          
      });
  });
})
/****
添加保存数据通用方法
sqls:sql语句
data：组装的参数
****/
const save=((sql,data,callback)=>{
	/*转换参数*/
	let field=[]
	for(let i=0;i<data.length;i++){
		field.push(data[i])
	}
	pool.getConnection(function(err, connection) {
    connection.query(sql, field, function (err,result) {
      if (err) {
        console.log("insertUser_Sql Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
})
const save1=((sql,data,callback)=>{
  /*转换参数*/
  let field=[]
  for(let i=0;i<data.length;i++){
    field.push(data[i])
  }
  pool.getConnection(function(err, connection) {
    connection.query(sql, field, function (err,result) {
      if (err) {
        console.log("insertUser_Sql Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
})
/****
数据更新通用方法
sqls:sql语句
data：组装的参数
****/
const updateInterview=((sql,data,callback)=>{
	/*转换参数*/
	let field=[]
	for(let i=0;i<data.length;i++){
		field.push(data[i])
	}
	pool.getConnection(function(err, connection) {
    connection.query(sql, field, function (err,result) {
      if (err) {
        console.log("update_Sql Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
})
/****
通过主键(id)删除数据
id:主键id
dbname:表名
****/
const deleteById=((id,dbname,callback)=>{
	pool.getConnection(function(err, connection) {
    var deleteById_Sql ='DELETE FROM `'+dbname+'` WHERE `id` = ?'
    console.log(deleteById_Sql)
    connection.query(deleteById_Sql,[id], function(err, result) {
      if (err) {
        console.log("deleteById Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
})
/****
通过主键(id)获取详情
id:主键id
dbname:表名
****/
const getinfoById =((id,dbname,callback)=>{
	console.log(id)
	pool.getConnection(function(err, connection) {
    var getUserById_Sql ='select * from '+dbname+' where id='+id+'';
    connection.query(getUserById_Sql,[id], function(err, result) {
      if (err) {
        console.log("getConnection Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
	});
})
module.exports ={
	getAllUsers,
	save,
  save1,
	updateInterview,
	deleteById,
	getinfoById
}
