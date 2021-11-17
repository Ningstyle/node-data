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
