jQuery.fn.scroll4ever = function(options)
{
	var container = $(this);
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
		
	log = function(obj)
	{
		 if (debug) { console.log('scroll2ever: ' + obj); }
	}
	
	log(url);
	log('initialized');

	load = function()
	{
		start();
		loading = true;
		
		var next = (skip)? skip*page : page;
		log('loading: ' + next);
		$.get(url + next, function(data)
		{
			log(url+next);
			if (selector) { data = $(data).find(selector); }
			
			container.append(data);
			page++;
			if (!data.length) { ended = true; log('no more data, ended'); }
			loading = false;
			
			complete();
			$(window).trigger('scroll');
		});

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