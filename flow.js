$(document).ready(function() {
    if (!window.console) window.console = {};
    if (!window.console.log) window.console.log = function() {};

    /* Flow.hello(); */
    var json = { msg : "append to flow (json)" , id : "" };
    flow.start();
    
    json.id = "first-object";
    flow.append(json);
    json.id = "second-object";
    flow.append(json); 
    
});

/* 切り離し予定 */
var flow = {
    latest_id : "empty-content",
    start : function() {
        //console.log(this.latest_id);
        $("#ykn-flow").append("<div id='"+this.latest_id+"' style='display:none;'></div>");
    },
    append : function(json) {
   	var content = "<div id='"+json.id+"' class='ykn-flow-row'>"+json.msg+"</div>";
	$("#"+this.latest_id).before(content);
        this.show(json.id);
        this.latest_id = json.id;
    },
    show : function(id) {
	$("#"+id).show(700);
    },
    hello : function() { alert("hello flow"); }  
};
