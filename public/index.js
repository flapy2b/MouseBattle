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

	$('#finish-btn').on('click', function(){
		if($('#username').val().length > 2 && $('#username').val().length < 13 && $('#username').val().match(/[^a-zA-Z0-9_-]+/) == null)    {
			$('form').submit();
		} else {
			console.log('Error on the form!');
			console.log('Look at the red box for more infos')
			if($('#username').val().match(' ')){
				$('error').css('display', 'block');
				$('error h2').html("The username can't contain spaces!");
			}
			else if($('#username').val().length > 12) {
				$('error').css('display', 'block');
				$('error h2').html("The username have to contain less than 12 characters!");
			}
			else if($('#username').val() == "") {
				$('error').css('display', 'block');
				$('error h2').html("The username can't be empty!");
			}
			else if($('#username').val().length < 3) {
				$('error').css('display', 'block');
				$('error h2').html("The username have to contain more than 3 characters!");
			}
			else if($('#username').val().match(/[^a-zA-Z0-9_-]+/) != null) {
				$('error').css('display', 'block');
				$('error h2').html("The username can't contain special characters!");
			}
			else {
				$('error').css('display', 'block');
				$('error h2').html("An unknown error hapend!");
			}
		}
	});

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
