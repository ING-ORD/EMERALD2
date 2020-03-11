<?php 
$post = $_POST;

require("../../configDB.php");

$link = mysqli_connect($HOST_DB, $USER_DB, $PASSWORD_DB, $NAME_DB);

mysqli_query($link, "SET NAMES 'utf8' ");

$query = "SELECT `name` , url_img as linkImg  FROM `products`";
$result = mysqli_query($link, $query) or die(mysqli_error($link));

for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
	echo json_encode($data);

?>
