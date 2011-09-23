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
		$phrase .= 	$words[rand(0,4)].' ';
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
			li { background: #ccc; display:block; margin:1px; padding:15px; }
		</style>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
		<script src="jquery.scroll4ever.js"></script>
		<script>
			$(document).ready(function()
			{
				$('.scroll4ever').scroll4ever({
					url:document.URL + '?page=', // data source url, could be another page. page number will always be added in the end
					selector:'.scroll4ever li', // this is the selection made in the source url data
					distance:100, // distance to the end of window to trigger the new 'page'
					debug: true, // if you want some messages in console...
					start: function(){}, // callback called when a new page load begins, good for loading messages
					complete: function(){}, // callback called when a new page load ends
					container: false, // where the new content must be loaded, main selection is the default one
					skip: false // number of itens to skip, default is to use page numbering and server side skip/offset calculation
				});
			});
		</script>
	</head> 
	<body>
		<h1>Awesome news</h1>
		<p>Scroll the window to load more and more.</p>
		<ul class="scroll4ever">
			<?php for($x = $start; $x < $offset; $x++) { ?>
				<li><?= $news[$x][0] ?> - <?= $news[$x][1] ?></li>
			<?php } ?>
		</ul>
	</body>
</html>
