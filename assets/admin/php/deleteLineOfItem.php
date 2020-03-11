
<?php

$post = $_POST;

require("../../configDB.php");

$link = mysqli_connect($HOST_DB, $USER_DB, $PASSWORD_DB, $NAME_DB);

mysqli_query($link, "SET NAMES 'utf8'");

$id = $post["data"];


$query = "DELETE FROM plan WHERE plan.id = ".$id." ;";
$result = mysqli_query($link, $query) or die(mysqli_error($link));



?>
