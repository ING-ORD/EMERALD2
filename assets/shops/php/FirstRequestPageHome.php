<?php 
$post = $_POST;

$host = "localhost";
$user = "root";
$password = "12345678";
$db_name = "stock";

$link = mysqli_connect($host, $user, $password, $db_name);

mysqli_query($link, "SET NAMES 'utf8' ");

$query = "SELECT `name` , url_img as linkImg  FROM `products`";
$result = mysqli_query($link, $query) or die(mysqli_error($link));

for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
	echo json_encode($data);

?>
