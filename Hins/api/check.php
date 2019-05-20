<?php
include 'conn.php';

$name = isset($_GET['name']) ? $_GET['name'] : '';

//1、写查询语句  *从userinf表单中查询tel所有的值
$sql = "SELECT * FROM userinf WHERE tel='$name'";

//2、执行sql语句  *相当在数据库里面的'运行'
$res = $conn->query($sql);

if ($res->num_rows) {
    //找到了，已存在，不给注册
    echo 'no';
} else {
    echo 'yes';
}
?>