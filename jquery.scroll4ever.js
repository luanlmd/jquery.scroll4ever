(function($){

    $.fn.scroll4ever = function(options)
    {
        var settings = $.extend({
            trigger : false,
            container: $(this),
            selector: false,
            distance : 0,
            start : function(){},
            complete : function(){},
            debug : false
        }, options);

        var loading = false;

        log = function(obj)
        {
            if (settings.debug && console.log != undefined) { console.log(obj); }
        }

        log('initialized');

        log(settings);

        log($(this));

        $('body').on('click', settings.trigger, function(){

            log('running start');
            settings.start();
            loading = true;

            url = $(this).attr('href');
            div = $('<div />').load(url, function() {
                $(settings.trigger).replaceWith(div.find(settings.trigger));
                $(settings.container).append(div.find(settings.selector));
                loading = false;
                log('running complete');
                settings.complete();
            });

            return false;
        });

        if (settings.distance)
        {
            $(window).on('scroll',function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height() - settings.distance))
                {
                    if (!loading)
                    {
                        $(settings.trigger).trigger('click');
                    }
                }
            });
        }
    };

})(jQuery);