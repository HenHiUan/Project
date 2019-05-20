<?php

$username = isset($_GET['username']) ? $_GET['username'] : '';
$shopname = isset($_GET['shopname']) ? $_GET['shopname'] : '';
$sprice = isset($_GET['sprice']) ? $_GET['sprice'] : '';
$num = isset($_GET['num']) ? $_GET['num'] : '';
$title = isset($_GET['title']) ? $_GET['title'] : '';
$img = isset($_GET['img']) ? $_GET['img'] : '';
$size = isset($_GET['size']) ? $_GET['size'] : '';
$color = isset($_GET['color']) ? $_GET['color'] : '';
$kucun = isset($_GET['kucun']) ? $_GET['kucun'] : '';

include 'conn.php';

$sql = "INSERT INTO carts(username,shopname,price,sprice,amount,title,img,size,color,kucun) VALUES('$username','$shopname','$sprice','$sprice','$num','$title','$img','$size','$color','$kucun')";

$res = $conn->query($sql);

// if ($res) {
//     echo 'yes';
// } else {
//     echo 'no';
// }

?>