/*
    - required option
    var options = {
        cls : {
            'classname' : {
                event : {
                    hover : {
                        in : {
                            css : null,
                            js : null
                        },
                        out : {
                            css : null,
                            js : null
                        }
                    },
                    click : {
                        css : null,
                        js : null
                    }
                }
            }
        }
    }
*/

(function($){
    $.fn.autoInit = function(options){
        var defaults = {
            // nothing  
        };
        var settings = $.extend(defaults, options);
        // expression
        var CLS_EXP = function(cls_name){ return '.' + cls_name; };
        var ID_EXP = function(id_name){ return '#' + id_name; };
        var TAG_EXP = function(tag_name){ return tag_name };
        // css/js をセット
        var init = function(element, hash, selector){
            for(key in hash) {
                // set hover
                if(hash[key].event.hover.in || hash[key].event.hover.out){
                    element.find(selector(key)).hover(function(e){
                        // TODO: move to common function??
                        var css_hash = hash[key].event.hover.in.css;
                        if(css_hash){
                            for(css_key in css_hash){
                                $(this).css(css_key, css_hash[css_key]);
                            }
                        }
                        var js_hash = hash[key].event.hover.in.js;
                        if(js_hash) js_hash(e);
                    },function(e){
                        var css_hash = hash[key].event.hover.out.css;
                        if(css_hash){
                            for(css_key in css_hash){ 
                                $(this).css(css_key, css_hash[css_key]);
                            }
                        }
                        var js_hash = hash[key].event.hover.out.js;
                        if(js_hash) js_hash(e);
                    });
                }
                // set click
                if(hash[key].event.click){
                    element.find(selector(key)).click(function(e){
                        var css_hash = hash[key].event.click.css;
                        if(css_hash){
                            for(css_key in css_hash){ 
                                $(this).css(css_key, css_hash[css_key]);
                            }
                        }
                        var js_hash = hash[key].event.click.js;
                        if(js_hash) js_hash(e);
                    });
                }
                // TODO: どんどんイベント追加していく。
            }
        };
        // execute ださい
        if(settings.cls) init(this, settings.cls, CLS_EXP);
        if(settings.id) init(this, settings.id, ID_EXP);
        if(settings.tag) init(this, settings.tag, TAG_EXP);
        // TODO: learn how to show an error msg on console.
        return this;
    }
})(jQuery);