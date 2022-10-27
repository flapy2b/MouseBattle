function generateRandomColorHex() {
  return "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6);
}

$(document).ready(function () {
  var socket = io();
  var players = [];
  let searchParams = new URLSearchParams(window.location.search);
  var username = searchParams.get('username');
  var color = searchParams.get('color');
  var position = position = {};

  id = Math.floor(Math.random() * 10000);
  //$('#position').html("ID : " + id + "<br> Username : " + username + " <br> Color : " + color);

  // Receive a move from the server
  socket.on('move', function(msg){
    msg.forEach(m => {
      // If element with ID dosn't exists
      if($('#player' + m.id).length == 0){
        $('body').append("<div id='player" + m.id +
                          "' class='player'>+</div>");
        $('body').append("<div id='label" + m.id +
                          "' class='label'>" + m.username +
                          "</div>");

        //color = generateRandomColorHex();
        $('#player' + m.id).css('color', m.color);
        $('#label' + m.id).css('color', m.color);
      }
      $('#player' + m.id).css('left', m.x + 'px');
      $('#player' + m.id).css('top', m.y + 'px');
      $('#label' + m.id).css('left', m.x - 15 + 'px');
      $('#label' + m.id).css('top', m.y - 15 + 'px');
    });
  });

  // Receive a deconnection from the server
  socket.on('del', function(msg){
    $('#player' + msg).remove();
    $('#label' + msg).remove();
  });

  // The player moves
  $( document ).on( "mousemove", function( event ) {
    position.id = id;
    position.x = event.pageX;
    position.y = event.pageY;
    position.username = username;
    position.color = color;
    /*
    position = '{"id":"' + id + '","x":"' + event.pageX + '","y":"' +
                event.pageY + '","username": "' + username + '","color":"' + color + '"}';
              */
    socket.emit('position', position);
  });
});
