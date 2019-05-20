<?php

$id = isset($_GET['id']) ? $_GET['id'] : '';

include 'conn.php';

$sql = "SELECT * FROM shopping WHERE gid=$id";

$res = $conn->query($sql);

$content = $res->fetch_all(MYSQLI_ASSOC);
// var_dump($content);

echo json_encode($content, JSON_UNESCAPED_UNICODE);
?>