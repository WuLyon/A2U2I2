// JavaScript Document
var origin;
$(".container").find("a").on("drop",
function(e) {
    var origin_pos = $(origin).position();
    var target_pos = $(e.target).position();
 
    $(origin).addClass("move").animate(target_pos, "fast",
    function() {
        $(this).removeClass("move");
    });
 
    $(e.target).addClass("move").animate(origin_pos, "fast",
    function() {
        $(this).removeClass("move");
    });
 
}).on("dragstart",
function(e) {
 	//alert('dragstart');
    // only dropEffect='copy' will be dropable
    e.originalEvent.dataTransfer.effectAllowed = 'move';
    origin = this;
 
}).on("dragover",
function(e) {
	
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    e.originalEvent.dataTransfer.dropEffect = 'move'; // only dropEffect='copy' will be dropable
});