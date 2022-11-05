$(document).ready(function () {
	$colorSelected = false;
	$username = false;

	$(".color").click(function () {
	    $(".color").css("border", "2px solid #bbb");
	    $(this).css("border", "2px solid #07f");
	    $("#colorValue").val($(this).children().css("background-color"));
	    $colorSelected = true;
	    if($username){
	    	$('#finish-btn').removeAttr('disabled');
		}
	});

	$('#username').change(function(){
	    $username = true;
	    if($colorSelected){
			$('#finish-btn').removeAttr('disabled');
		}
	})

});

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
