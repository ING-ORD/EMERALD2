
<?php

$post = $_POST;

$host = 'localhost'; //имя хоста, на локальном компьютере это localhost
$user = 'root'; //имя пользователя, по умолчанию это root
$password = '12345678'; //пароль, по умолчанию пустой
$db_name = 'stock'; //имя базы данных

$link = mysqli_connect($host, $user, $password, $db_name);

mysqli_query($link, "SET NAMES 'utf8'");

$id = $post["data"];


$query = "DELETE FROM plan WHERE plan.id = ".$id." ;";
$result = mysqli_query($link, $query) or die(mysqli_error($link));



?>
