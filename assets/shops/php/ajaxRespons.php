<?php 
    $post = $_POST;
    
    require("../../configDB.php");

    $link = mysqli_connect($HOST_DB, $USER_DB, $PASSWORD_DB, $NAME_DB);
    
    mysqli_query($link, "SET NAMES 'utf8'");
    #print_r($post["data"]);
    #$dataquery = $post["data"];
    #$delete = "DELETE FROM `buys` WHERE `id_client`= 1 ; ";
    #mysqli_query($link,$delete) or die(mysqli_error($link));
    
    $insertBuysQuery = "INSERT INTO `buys` (`id_client`) VALUES (1);";

    mysqli_query($link,$insertBuysQuery) or die(mysqli_error($link));

    $idBuysSelect = "SELECT LAST_INSERT_ID();";
    $idBuys = mysqli_query($link,$idSelect) or die(mysqli_error($link));

    echo $idBuys;    

    for($i = 0 ;$i < count($dataquery); $i++){
    	$query = "INSERT INTO `list_products`( `buy`, `product`, `count`) VALUES ( 1 , (SELECT `products`.`id` FROM `products` WHERE `products`.`name` = '".$dataquery[$i]['name']."' ) , ".$dataquery[$i]['count']." );";
    	echo $query;
    	mysqli_query($link, $query) or die(mysqli_error($link));

    }
    echo $dataquery;

    ?>
