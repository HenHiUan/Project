<?php


header('content-type:text/html;charset=utf-8'); //设置编码 防止中文乱码

//获取前端的数据
$name = isset($_POST['name']) ? $_POST['name'] : '';
$passw = isset($_POST['passw']) ? $_POST['passw'] : '';

//连接数据库
include 'conn.php';

//查询数据库 *查询storsge表单中的username的值和password的值是否存在
$sql = "SELECT * FROM userinf WHERE tel='$name' AND password='$passw'";
// echo $sql;

//执行sql语句
$res = $conn->query($sql); //得到结果集
// var_dump($res);

if($res->num_rows){
    //存在
    echo 'yes';
}else{
    //不存在
    echo 'no';
}
?>