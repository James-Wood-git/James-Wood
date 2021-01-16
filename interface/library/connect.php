<?php
    header('content-type:text/html;charset=utf-8');
    $mysql_config = array(
        //host 主机名 mysql默认运行在3306端口
        'host'=>'localhost:3306',
        //登录数据库的用户名
        'db_user'=>'root',
        //登录数据库的密码
        'db_pass'=>'root',
        //需要连接的数据库
        'db'=>'mi.com'
    );

    //登录（连接）数据库
    $mysqli = @new mysqli (
        $mysql_config['host'],
        $mysql_config['db_user'],
        $mysql_config['db_pass']
    );

    //判断连接是否有误
    if($mysqli->connect_errno){
        die('连接错误'.$mysqli->connect_errno);
    };

    //设置查询字符集
    $mysqli->query('set names utf8');

    //选择数据库
    $select_db = $mysqli->select_db($mysql_config['db']);

    if(!$select_db){
        die('数据库选择错误'.$mysqli->error);
    }
?>