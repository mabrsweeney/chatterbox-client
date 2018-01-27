// YOUR CODE HERE:

$(document).ready(function() {
  var app = {
    
    server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    rooms: {},
    friends: {},

    init: function() {
      app.fetch();
      setInterval(function() {
        app.fetch();
      }, 6000);

      $('#send').on('submit', function(e) {
        e.preventDefault();
        app.handleSubmit();
      });

      $(document).on('change', '#roomSelect', app.fetch);
    },

    fetch: function() {
      console.log('fetching...');
      $.ajax({
        url: app.server,
        type: 'GET',
        data: { 
          order: '-createdAt'
        },
        contentType: 'json',
        success: function({results}) {
          app.clearMessages();
          for (var i = 0; i < results.length; i++) {

            //Add rooms
            if (results[i].roomname !== undefined && app.rooms[results[i].roomname] === undefined) {
              app.renderRoom(results[i].roomname);
              app.rooms[results[i].roomname] = results[i].roomname;
            }
            app.renderMessage(results[i]);
          }
        },
        error: function(data) {
          console.log('error!');
        }
      });
      
    },

    send: function(value) {
      
      $.post(app.server, value);
      // $.ajax({
      // // This is the url you should use to communicate with the parse API server.
      //   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      //   type: 'POST',
      //   data: value,
      //   contentType: 'application/json',
      //   success: function (data) {
      //     console.log(data);
      //   },
      //   error: function (data) {
      //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      //     console.error('chatterbox: Failed to send message', data);
      //   }
      // });
    },

    renderMessage: function({username, text, roomname}) {
      var chat = $('<div class="chat"></div>');
      var usrnm = $('<a class=username></a>');
      var textElem = $('<p></p>');
      textElem.text(text);
      usrnm.text(username);
      chat.append(usrnm);
      chat.append(textElem);
      $('#chats').append(chat);
    },

    clearMessages: function() {
      $('#chats').empty();
    }, 

    renderRoom: function(room) {
      $('#roomSelect').append($(`<option>${room}</option>`));
    },

    handleUsernameClick: function() {
      console.log('username clicked!');
    },

    handleSubmit: function() {
      var data = $('#send :input').serialize();
      //console.log(data);
      var username = (/=.*/).exec(window.location.search)[0].slice(1);
      //console.log(username);
      app.send({username: username, text: data});
    }  
  };

  console.log('document ready');
  app.init();
  
});
