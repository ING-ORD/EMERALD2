<?php 
$post = $_POST;

   require("../../configDB.php");

   $link = mysqli_connect($HOST_DB, $USER_DB, $PASSWORD_DB, $NAME_DB);

    mysqli_query($link, "SET NAMES 'utf8'");

    $query = "UPDATE active SET item=1 WHERE id=1;";
 	$query2 = "UPDATE cells SET busy=0 WHERE 1;";

    mysqli_query($link, $query) or die(mysqli_error($link));
    mysqli_query($link, $query2) or die(mysqli_error($link));
 ?>
