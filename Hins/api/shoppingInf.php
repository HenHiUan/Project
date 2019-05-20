<?php
header("Content-Type:text/html;charset=utf-8");

include 'conn.php';

$sql = 'SELECT * FROM shopping';

$res = $conn->query($sql);

$content = $res->fetch_all(MYSQLI_ASSOC);

echo json_encode($content, JSON_UNESCAPED_UNICODE);
?>