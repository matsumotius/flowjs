(function($){
    $.fn.flow = function(options){
        var defaults = {
            animation : {
                enabled : true,
                show : {
                    interval : 700
                }
            },
            entrance_id : 'id-for-flowjs-jQuery-plugin'
        };
        
        var Util = {
            tag : {
                BLANK : ' ',
                double_quotes : function(val){
                    return '\"'+val+'\"';   
                },
                generate : function(name, attr, val){
                    if(!name) return '';
                    // start
                    var tag_string = '<' + name;
                    for(var key in attr) {
                        tag_string += Util.tag.BLANK + key + '=' + Util.tag.double_quotes(attr[key]);
                    }
                    tag_string += '>';
                    // content
                    tag_string += ((val) ? val : '');
                    // end
                    tag_string += '</' + name + '>';
                    
                    return tag_string;
                }
            },
            attr : {
                concat : function(a, b){
                    for(key in b){
                        if(key == 'style' && a.style){
                            if(a.style[a.style.length] != ';'){
                                a.style += ';';
                            }
                            a.style += b[key];
                            continue;
                        }
                        a[key] = b[key];
                    }
                    return a;
                }
            }
        };
        
        var settings = $.extend(defaults, options);
        
        $(this).append(Util.tag.generate('div', { 'id' : settings.entrance_id }, null));
        
        this.append = function(msg, tag, attr){
            if(!msg) return;
            $(this).find('#'+settings.entrance_id).after((tag)?Util.tag.generate(tag, Util.attr.concat(attr, { 'style' : 'display:none;' }), msg):msg);
            
            if(attr.id && settings.animation.enabled){
                $(this).find('#'+attr.id).hide();
                $(this).find('#'+attr.id).show(settings.animation.show.interval);
            }
            if(settings.jscss && $(this).jscss){
                console.log('apply jscss option: ',settings.jscss);
                $('*').jscss(settings.jscss);
            }
        };
        return this;
    }
})(jQuery);
