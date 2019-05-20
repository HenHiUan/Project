<?php

$uid = isset($_GET['uid']) ? $_GET['uid'] : '';

include 'conn.php';

$sql2 = "DELETE FROM carts WHERE uid=$uid";
$res2 = $conn->query($sql2);

$sql = 'SELECT * FROM carts';

$res = $conn->query($sql);

$content = $res->fetch_all(MYSQLI_ASSOC);

echo json_encode($content, JSON_UNESCAPED_UNICODE);
?>