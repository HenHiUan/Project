<?php
$severname = 'localhost';
$usename = 'root';
$psw = '';
$basename = 'project';

$conn = new mysqli($severname, $usename, $psw, $basename);

if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

?>
