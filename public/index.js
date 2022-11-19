// Check if the parameters are good to send
$(document).ready(function () {
	$colorSelected = false;
	$username = false;

	// Set the color
	$(".color").click(function () {
	    $(".color").css("border", "2px solid #bbb");
	    $(this).css("border", "2px solid #07f");
	    $("#colorValue").val($(this).children().css("background-color"));
	    $colorSelected = true;
	    if($username){
			// Set button style to disabled
	    	$('#finish-btn').removeAttr('disabled');
		}
	});
	// Set the username
	$('#username').change(function(){
	    $username = true;
	    if($colorSelected){
			$('#finish-btn').removeAttr('disabled');
		}
	})

});

// Disable the "enter to send" to prevent bugs
// With "event.keyCode"
$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});
