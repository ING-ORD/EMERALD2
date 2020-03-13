<?php 
$post = $_POST;

require("../../configDB.php");

$link = mysqli_connect($HOST_DB, $USER_DB, $PASSWORD_DB, $NAME_DB);

$answer = [];

mysqli_query($link, "SET NAMES 'utf8' ");

// $query = "SELECT `buys`.`buy`, `clients`.`name` AS `client`, `products`.`name` AS `product`, `buys`.`count` AS `count` FROM `buys`,`clients`,`products` WHERE `clients`.`id` = `buys`.`client` AND `products`.`id` = `buys`.`product`";
// $result = mysqli_query($link, $query) or die(mysqli_error($link));

// for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
// $answer["buys"] = $data;

//список заказов от клиентов
$query = "SELECT `buys`.`id` AS 'buy', `clients`.`name` AS 'client', `products`.`name` AS 'product', `list_products`.`count` FROM `buys` JOIN `list_products` ON `list_products`.`buy` = `buys`.`id` JOIN `clients` ON `buys`.`id_client` = `clients`.`id` JOIN `products` ON `list_products`.`product` = `products`.`id`;";

$result = mysqli_query($link, $query) or die(mysqli_error($link));

$data = [];
$endClient = "";
$endBuysClient = "";
$itemBuysClient = 0;

for ( $i = 0; $i < mysqli_num_rows($result); $i++ ){
    $row = mysqli_fetch_assoc($result);

    $client = $row["client"];
    if ($endBuysClient != $row["buy"] and $endBuysClient != "") {
        $itemBuysClient += 1;
    }
    $endBuysClient = $row["buy"];

    unset($row["client"]);
    unset($row["buy"]);

    $data[$client][$itemBuysClient][] = $row;

};
$answer["buys"] = $data;

//список поставщиков
$query = "SELECT `id`,`name` FROM `providers`";
$result = mysqli_query($link, $query) or die(mysqli_error($link));

for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
$answer["providers"] = $data;

//список продуктов
$query = "SELECT `id`,`name` FROM `products`";
$result = mysqli_query($link, $query) or die(mysqli_error($link));

for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
$answer["products"] = $data;

//список клиентов
$query = "SELECT `id`,`name` FROM `clients`";
$result = mysqli_query($link, $query) or die(mysqli_error($link));

for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
$answer["clients"] = $data;

//список поставок
$query = "SELECT `plan`.`id`,`plan`.`item`, `providers`.`name` AS `destination` ,`plan`.`type` AS `typeOfTransportation`, `products`.`name` AS `product`, `count` AS `countProduct` FROM `plan`, `products`,`providers` WHERE `plan`.`type` = 0 AND `products`.`id` = `plan`.`product` AND `plan`.`destination` = `providers`.`id` AND `plan`.`item` = 1 ;";
$result = mysqli_query($link, $query) or die(mysqli_error($link));

for ($data = []; $row  = mysqli_fetch_assoc($result); $data[] = $row);
$answer["postDelivery"] = $data;

//список доставок
$query = "SELECT `plan`.`id`,`plan`.`item`, `clients`.`name` AS `destination` ,`plan`.`type` AS `typeOfTransportation`, `products`.`name` AS `product`, `count` AS `countProduct` FROM `plan`, `products`,`clients` WHERE `plan`.`type` = 1 AND `products`.`id` = `plan`.`product` AND `plan`.`destination` = `clients`.`id` AND `plan`.`item` = 1 ;";
$result = mysqli_query($link, $query) or die(mysqli_error($link));

for ($data = []; $row  = mysqli_fetch_assoc($result);$data[] = $row);
$answer["delivery"] = $data;

$link->close();

echo json_encode($answer);

?>
