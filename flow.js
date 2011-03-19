var flow = {
    // new module
    config : {
        show_interval : 700 
    },
    event : {
        /*
        hover : {
            in : {
                'class-name' : {
                    css : { 'css-key' : 'css-value' },
                    js : function(){}
                },
                'class-name2' : {
                    css : { 'css-key' : 'css-value' },
                    js : function(e){}
                }
            },
            out : {
                'class-name' : {
                    css : { 'css-key' : 'css-value' },
                    js : function(e){}
                },
                'class-name2' : {
                    css : { 'css-key' : 'css-value' },
                    js : function(e){}
                }
            }
        }
        */
    },
    target : {
        id : '',
        latest_flow : 'empty-flow'
    },
    init : function(element_id, event){
        flow.target.id = element_id;
        if(event) flow.event = event;
        // append empty-flow
        $('#'+flow.target.id).append(flow.util.tag.div(flow.target.latest_flow, null, null));
    },
    set : {
        show_interval : function(ms) {
            flow.config.show_interval = ms;
        },
        hover : function(element_id){
            // set once
            // console.log('start setting hover:', element_id);
            if(!flow.event.hover) return;
            
            var hover_in, hover_out;
            for(var cls in flow.event.hover.in){
                if($('#'+element_id).attr('class') == cls){
                    console.log(flow.event.hover.in[cls]);
                    hover_in = flow.event.hover.in[cls];
                    break;
                }
            }
            for(var cls in flow.event.hover.out){
                if($('#'+element_id).attr('class') == cls){
                    console.log(flow.event.hover.out[cls]);
                    hover_out = flow.event.hover.out[cls];
                    break;
                }
            }
            // console.log(hover_in, hover_out);
            $('#'+element_id).hover(function(e){
                if(hover_in.css){
                    for(var key in hover_in.css){
                        // console.log('set hover in: ', key, hover_in[key]);
                        $(this).css(key, hover_in.css[key]);
                    }
                }
                if(hover_in.js) hover_in.js(e);
            },function(e){
                if(hover_out.css){
                    for(var key in hover_out.css){
                        // console.log('set hover out: ', key, hover_out[key]);
                        $(this).css(key, hover_out.css[key]);
                    }
                }
                if(hover_out.js) hover_out.js(e);
            });
        }
    },
    append : function(element_id, content){
        $('#'+flow.target.latest_flow).before(content);
        flow.set.hover(element_id);
        flow.show(element_id);
        flow.target.latest_flow = element_id;
    },
    show : function(element_id){
        // console.log('show id:',element_id, flow.config.show_interval);
        $("#"+element_id).show(flow.config.show_interval);
    },
    util : {
        tag : {
            div : function(id, cls, val) {
                return '<div id=\"'+((id)?id:'')+'\" class=\"'+((cls)?cls:'')+'\">'+((val)?val:'')+'</div>';
            }
        }
    }
};

