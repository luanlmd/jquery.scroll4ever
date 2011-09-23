jQuery.fn.scroll4ever = function(options)
{
	var loading = false;
	var ended = false;
	
	var options = options || []
	var debug = options['debug'] || false;
	var url = options['url'] || false;
	var selector = options['selector'] || false;
	var skip = options['skip'] || false;
	var page = skip/skip || 2;
	var distance = options['distance'] || 250;
	var start = options['start'] || function(){};
	var complete = options['complete'] || function(){};
	var container = options['container'] || $(this);
		
		
	console.log($(this));
	log = function(obj)
	{
		 if (debug) { console.log(obj); }
	}
	
	log(url);
	log('initialized');

	load = function()
	{
		start();
		loading = true;
		
		var next = (skip)? skip*page : page;
		log('loading: ' + url + next);
		$.ajax(url + next,{ success:function(data)
		{
			
			if (selector) { data = $(data).find(selector); }
			//console.log(data);
			if (!data.length) { ended = true; log('no more data, ended'); }
			else
			{
				container.append(data);
				page++;
				$(window).trigger('scroll');
			}
			loading = false;
			complete();
			
		}, dataType:'xml'});

	}
	
	$(window).scroll(function(){
		if ($(document).scrollTop() >= ($(document).height() - $(window).height() - distance))
		{
			if (!ended && !loading)
			{
				load();
			}
		}
	});
};
