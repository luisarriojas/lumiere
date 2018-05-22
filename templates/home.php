<?php
/*
LumiereFotosDeBoda.com
Copyright (c) 2015 LumiereFotosDeBoda.com

Developed by Luis E. Arriojas for LumiereFotosDeBoda.com
LinkedIn: https://www.linkedin.com/in/luisarriojas
*/

include('../scripts/db.php');

$data = $db->query("SELECT id, title, subtitle
                    FROM banner
                    WHERE status = '1'
                    ORDER BY id ASC;");

if ($db->errno) {
    $db->close();
    exit;
}
?>

<div id="wowslider-container1">
    <div class="ws_images">
        <ul>
            <?php
                while ($row = $data->fetch_object()) {
                    echo '<li>';
                    echo '<a href="#!portafolio/' . $row->id . '/' . $row->title . '"><img src="img/home/' . $row->id . '.jpg" alt="' . $row->title . '<br>' . $row->subtitle . '" title="' . $row->title . '<br>' . $row->subtitle . '" id="wows1_' . $row->id . '"/></a>';
                    echo '</li>';
                }
            ?>
        </ul>
    </div>
</div>
<script type="text/javascript" src="wowSlider/engine1/wowslider.js"></script>
<script type="text/javascript" src="wowSlider/engine1/script.js"></script>
