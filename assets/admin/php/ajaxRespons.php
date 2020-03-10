<?php 
$post = $_POST;

    $host = 'localhost'; //имя хоста, на локальном компьютере это localhost
    $user = 'root'; //имя пользователя, по умолчанию это root
    $password = '12345678'; //пароль, по умолчанию пустой
    $db_name = 'stock'; //имя базы данных

    $link = mysqli_connect($host, $user, $password, $db_name);
    
    mysqli_query($link, "SET NAMES 'utf8'");

    $dataquery = $post["data"];
    // $delete = "DELETE FROM `buys` WHERE `client`= 1 ; ";
    // mysqli_query($link,$delete) or die(mysqli_error($link));
    // $selectProvider = "SELECT `drivers`.`id` FROM `drivers` WHERE `drivers`.`name` = '".$dataquery['provider']."' ";
    $selectProduct = "SELECT `products`.`id` FROM `products` WHERE `products`.`name` = '".$dataquery['product']."' ";
    $lineQuery = "SELECT COUNT(*) FROM `plan` WHERE `plan`.`item`=".$dataquery["item"].";";

    $linePlan = mysqli_query($link, $lineQuery) or die(mysqli_error($link));
    for ($line = []; $row  = mysqli_fetch_assoc($linePlan); $line[] = $row);
    
    if($dataquery['typeOfTransportation'] == '0'){
        $selectDestination = "SELECT `providers`.`id` FROM `providers` WHERE `providers`.`name` = '".$dataquery["destination"]."' ;";
        echo $selectDestination;
        $destination = mysqli_query($link, $selectDestination) or die(mysqli_error($link));
        for ($data = []; $row  = mysqli_fetch_assoc($destination); $data[] = $row["id"]);

        $destination = $data[0];
    }else if($dataquery['typeOfTransportation'] == '1'){

        $selectDestination = "SELECT `clients`.`id` FROM `clients` WHERE `clients`.`name` = '".$dataquery["destination"]."' ;";
        echo $selectDestination;
        $destination = mysqli_query($link, $selectDestination) or die(mysqli_error($link));
        for ($data = []; $row  = mysqli_fetch_assoc($destination); $data[] = $row["id"]);

        $destination = $data[0];

    }

    // print_r($dataquery);
    $query = "INSERT INTO `plan`(`item`, `line`,`destination`, `driver`,`type`, `product`, `count`) VALUES (".$dataquery['item'].", ".$line[0]['COUNT(*)'].", ".$destination." , 0, ".$dataquery['typeOfTransportation'].", (".$selectProduct."), ".$dataquery['countProduct'].");";

    echo $query;
    mysqli_query($link, $query) or die(mysqli_error($link));

    
    echo $dataquery;

    ?>
