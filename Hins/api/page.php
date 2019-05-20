<?php

include 'conn.php';

$page = isset($_GET['page'])?$_GET['page']:'1';
$num = isset($_GET['num']) ? $_GET['num'] : '12';

$index = ($page - 1) *$num;
$sql2 = "SELECT * FROM shopping LIMIT $index,$num";
$res2 = $conn->query($sql2); 
$content = $res2->fetch_all(MYSQLI_ASSOC);

$sql = 'SELECT * FROM shopping';

$res = $conn->query($sql);
$content2 = $res->fetch_all(MYSQLI_ASSOC);
$datalist = array(
    'data2' => $content2,
    'data' => $content,
    'total' => $res->num_rows,
    'page' => $page,
    'num' => $num,
);
echo json_encode($datalist, JSON_UNESCAPED_UNICODE);
?>