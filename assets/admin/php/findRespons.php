<?php 
$post = $_POST;

	$host = 'localhost'; //имя хоста, на локальном компьютере это localhost
    $user = 'root'; //имя пользователя, по умолчанию это root
    $password = ''; //пароль, по умолчанию пустой
    $db_name = 'stock'; //имя базы данных


    $link = mysqli_connect($host, $user, $password, $db_name);

    mysqli_query($link, "SET NAMES 'utf8'");

    $dataquery = $post["data"];
    // print_r($dataquery);
    //список поставок
    $query = "SELECT `plan`.`item`, `providers`.`name` AS `destination` ,`plan`.`type` AS `typeOfTransportation`, `products`.`name` AS `product`, `count` AS `countProduct` FROM `plan`, `products`,`providers` WHERE `plan`.`type` = 0 AND `products`.`id` = `plan`.`product` AND `plan`.`destination` = `providers`.`id` AND `plan`.`item` = '".$dataquery."' ;";
    $result = mysqli_query($link, $query) or die(mysqli_error($link));

    for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
    $answer["postDelivery"] = $data;

	//список доставок
    $query = "SELECT `plan`.`item`, `clients`.`name` AS `destination` ,`plan`.`type` AS `typeOfTransportation`, `products`.`name` AS `product`, `count` AS `countProduct` FROM `plan`, `products`,`clients` WHERE `plan`.`type` = 1 AND `products`.`id` = `plan`.`product` AND `plan`.`destination` = `clients`.`id` AND `plan`.`item` = '".$dataquery."' ;";
    $result = mysqli_query($link, $query) or die(mysqli_error($link));

    for ($data = []; $row  = mysqli_fetch_assoc($result);$data[] = $row);
    $answer["delivery"] = $data;

	echo json_encode($answer);

    ?>