<?php

// Begin random crap generator
$words = array('lorem','ipsum','dolor','ftw','sit','amet');
$news = array();
function phrase()
{
    $phrase = '';
    for ($x = 0; $x < 5; $x++)
    {
        global $words;
        $phrase .=  $words[rand(0,4)].' ';
    }
    return $phrase;
}
for ($x = 0; $x < 1000; $x++)
{
    $news[] = array($x, phrase());
}
// End random crap generator

// Pagination
$page = (@$_GET['page'])? $_GET['page'] : 1;
$offset = $page * 20;
$start = $offset - 20;

?>
<!DOCTYPE html>
<html>
<head>
    <title>Scroll4Ever - jQuery Infinite Scroll plugin</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
    * { margin:0; padding:0; margin:0; }
    body { padding:20px; }
    h1, p { margin:10px 0; }
    li { background: #ccc; display:block; margin:1px; padding:15px; }
    .trigger { padding:5px 10px; background:red; color:black; display:block; margin:20px 0; }
    </style>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <script src="jquery.scroll4ever.js"></script>
    <script>
    $(document).ready(function()
    {
        $('.scroll4ever').scroll4ever({
            trigger:'.scroll4ever .trigger',
            container: '.scroll4ever',
                    selector:'.scroll4ever > *', // this is the selection made in the source url data
                    distance:100, // distance to the end of window to trigger page load, if avoided, it will not auto trigger
                    debug: true, // if you want some messages in console...
                    start: function(){}, // callback called when a new page load begins, good for loading messages
                    complete: function(){}, // callback called when a new page load ends
                });
    });
    </script>
</head>
<body>
    <h1>Awesome news</h1>
    <p>Scroll the window to load more and more.</p>
    <p>Get the code in <a href="https://github.com/luanlmd/jquery.scroll4ever">my GitHub page</a></p>
    <div class="scroll4ever">
        <ul>
            <?php for($x = $start; $x < $offset; $x++) { ?>
            <li><?= $news[$x][0] ?> - <?= $news[$x][1] ?></li>
            <?php } ?>
        </ul>
        <a class="trigger" href="?page=<?= ++$page ?>" rel="next">Load more stuff like that!</a>
    </div>
</body>
</html>