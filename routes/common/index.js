var express = require('express');
var router = express.Router();
var mysql = require("mysql");
const $reruest = require('../../public/javascripts/main.js')
var $config = require('../../public/javascripts/config.js');
var pool = mysql.createPool($config.baseMysql);
// demo
router.get("/test",function(req,res){
	res.send({
		statuCode:200,
		messages:"success"
	});
})

module.exports = router;

