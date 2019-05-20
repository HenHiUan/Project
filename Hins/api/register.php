<?php
include 'conn.php';

$name = isset($_POST['name']) ? $_POST['name'] : '';
$passw = isset($_POST['passw']) ? $_POST['passw'] : '';

$sql = "INSERT INTO userinf(tel,password) VALUES('$name','$passw')";

    //执行语句
$res = $conn->query($sql);

if ($res) {
    echo 'yes';
} else {
    echo 'no';
}
?>