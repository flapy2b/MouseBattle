$(document).ready(function () {
    var socket = io();
    var players = [];
    let searchParams = new URLSearchParams(window.location.search);
    var username = searchParams.get('username');
    var color = searchParams.get('color');
    var position = {};

    // Set an ID
    id = Math.floor(Math.random() * 10000);

    // Receive a move from the server
    socket.on('move', function(msg){
        scores = "";
        msg.forEach(m => {
            // If element with ID dosn't exists
            if($('#player' + m.id).length == 0){
                $('body').append("<div id='player" + m.id +
                "' class='player'>+</div>");
                $('body').append("<div id='label" + m.id + "' class='label'>" + m.username + "</div>");
                // Set the color of the player
                $('#player' + m.id).css('color', m.color);
                $('#label' + m.id).css('color', m.color);
            }
            // Move the player
            $('#player' + m.id).css('left', m.x + 'px');
            $('#player' + m.id).css('top', m.y + 'px');
            $('#label' + m.id).css('left', m.x - 15 + 'px');
            $('#label' + m.id).css('top', m.y - 15 + 'px');

        //color = generateRandomColorHex();
        $('#player' + m.id).css('color', m.color);
        $('#label' + m.id).css('color', m.color);
      });
    });

    // Receive a deconnection from the server
    socket.on('del', function(msg){
        $('#player' + msg).remove();
        $('#label' + msg).remove();
    });

    // Change the position of the coin
    socket.on('coin', function(msg){
        $('#coin').remove();
        msg = JSON.parse(msg);
        $('body').append("<div id='coin'></div>");
        $('#coin').css('left', msg.x + 'px');
        $('#coin').css('top', msg.y + 'px');
        console.log($('#coin'));
    });

    socket.on('score', function(msg){
        msg.forEach(m => {
            scores += m.username + " : " + m.score + "<br>";
        });
        $('#scores').html(scores);
        $('#coin').remove();
    });

    $('#coin2').on("click", function(){
        console.log("[=] Coin catched!");
        position.score++;
        socket.emit('score', position);
    });

    $('div').on('click', function() {
        alert($(this).attr('id'));
    });

    // The player moves
    $( document ).on( "mousemove", function( event ) {
        position.id = id;
        position.x = event.pageX;
        position.y = event.pageY;
        position.username = username;
        position.color = color;
        socket.emit('position', position);
    });
});
