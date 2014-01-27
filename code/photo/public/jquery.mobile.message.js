/*
    Message plugin for jQuery Mobile
    Copyright (c) 2012 John Rummell (jrummell.com)
    Licensed under the GPL license (http://www.gnu.org/licenses/gpl.html)
    Version: _VERSION_
*/

//
// create closure
//
(function (jQuery)
{
    //
    // plugin methods
    //
    var methods = {
        init: function (options)
        {
            options = jQuery.extend({}, jQuery.fn.message.defaults, options);

            return this.each(function ()
            {
                var $this = jQuery(this);
                var data = $this.data("message");

                // only initialize once
                if (!data)
                {
                    // use given message or inner html
                    var messageText = options.message;
                    if (messageText == null || messageText == "")
                    {
                        messageText = $this.html();
                    }

                    // info or error?
                    if (options.theme == null)
                    {
                        options.theme = options.type == "info" ? "b" : "e";
                    }

                    // capitalize the first char of type
                    var title = options.type.toUpperCase().substring(0, 1) + options.type.substring(1);

                    // build message html
                    var messageHtml = "<div class='message-container' data-collapsed='false' data-role='collapsible' data-theme='" + options.theme + "' data-content-theme='" + options.theme + "'>";
                    messageHtml += "<h3>" + title + "<\/h3>";
                    messageHtml += "<p><span class='message-text'>" + messageText + "</span>";
                    if (options.dismiss)
                    {
                        messageHtml += "<a class='message-dismiss' href='#'>Dismiss</a>";
                    }
                    messageHtml += "</p></div>";

                    // set html and show the message
                    $this.html(messageHtml);
                    $this.find(".message-container").collapsible();

                    if (options.dismiss)
                    {
                        // hide messages on click
                        jQuery(".message-dismiss", $this).click(function ()
                        {
                            $this.hide('normal');
                            return false;
                        });
                    }
                    
                    if (options.autoShow)
                    {
                        $this.show();
                    }

                    // save options
                    $this.data("message", options);
                }
            });
        },
        options: function (options)
        {
            return this.each(function ()
            {
                var $this = jQuery(this);
                var currentOptions = $this.data("message") || {};
                options = jQuery.extend({}, currentOptions, options);
                $this.message("destroy").message("init", options);
            });
        },
        show: function ()
        {
            jQuery(this).show();
        },
        hide: function ()
        {
            jQuery(this).hide();
        },
        destroy: function ()
        {
            return this.each(function ()
            {
                var $this = jQuery(this);
                var data = $this.data("message");

                jQuery(".message-container", $this).remove();
                $this.html(data.message).css("display:none");
                $this.removeData("message");
            });
        }
    };

    jQuery.fn.message = function (method)
    {
        if (methods[method])
        {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof (method) === 'object' || !method)
        {
            return methods.init.apply(this, arguments);
        }
        else
        {
            jQuery.error("Method " + method + " does not exist on jQuery.message");
        }
    };

    //
    // plugin defaults
    //
    jQuery.fn.message.defaults = {
        message: "", // leave blank to use element html
        type: "info", // info or error
        theme: null, // info or error theme
        dismiss: true, // append 'Click to dismiss' to message and hide on click
        autoShow: true // show on initialize
    };
})(jQuery);
