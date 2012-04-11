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

        $(settings.trigger).live('click', function(){

            log('running start');
            settings.start();
            loading = true;

            url = $(this).attr('href') + ' ' + settings.selector;
            div = $('<div />').load(url, function() {
                $(settings.trigger).remove();
                $(settings.container).append(div.find('> *'));

                loading = false;

                log('running complete');
                settings.complete();
            });

            return false;
        });

        if (settings.distance)
        {
            $(window).scroll(function(){
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