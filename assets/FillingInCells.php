<?php

    require("./configDB.php");

    $link = mysqli_connect($HOST_DB, $USER_DB, $PASSWORD_DB, $NAME_DB);

    $query = "UPDATE cells SET busy=1;";

    mysqli_query($link, $query);

?>