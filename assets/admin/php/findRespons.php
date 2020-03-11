<?php 
$post = $_POST;

    require("../../configDB.php");

    $link = mysqli_connect($HOST_DB, $USER_DB, $PASSWORD_DB, $NAME_DB);

    mysqli_query($link, "SET NAMES 'utf8'");

    $dataquery = $post["data"];
    // print_r($dataquery);
    //список поставок
    $query = "SELECT `plan`.`id`,`plan`.`item`, `providers`.`name` AS `destination` ,`plan`.`type` AS `typeOfTransportation`, `products`.`name` AS `product`, `count` AS `countProduct` FROM `plan`, `products`,`providers` WHERE `plan`.`type` = 0 AND `products`.`id` = `plan`.`product` AND `plan`.`destination` = `providers`.`id` AND `plan`.`item` = '".$dataquery."' ;";
    
    $result = mysqli_query($link, $query) or die(mysqli_error($link));

    for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
    $answer["postDelivery"] = $data;

	//список доставок
    $query = "SELECT `plan`.`id`,`plan`.`item`, `clients`.`name` AS `destination` ,`plan`.`type` AS `typeOfTransportation`, `products`.`name` AS `product`, `count` AS `countProduct` FROM `plan`, `products`,`clients` WHERE `plan`.`type` = 1 AND `products`.`id` = `plan`.`product` AND `plan`.`destination` = `clients`.`id` AND `plan`.`item` = '".$dataquery."' ;";
    $result = mysqli_query($link, $query) or die(mysqli_error($link));

    for ($data = []; $row  = mysqli_fetch_assoc($result);$data[] = $row);
    $answer["delivery"] = $data;

	echo json_encode($answer);

    ?>
