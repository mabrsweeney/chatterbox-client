// YOUR CODE HERE:
var app = {

  init: function() {
    $('.username').click(function(){
      app.handleUsernameClick();
    });
  },

  fetch: function() {
    $.ajax({
      type: 'GET'
    });
  },

  send: function(value) {
    $.ajax({
    // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: value,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  renderMessage: function({username, text, roomname}) {
    var chat = $(`<div class='chat'>
                    <a class=username>${username}</a>
                    <p>${text}</p>
                  </div>`);
    $('#chats').append(chat);
  },

  clearMessages: function() {
    $('#chats').empty();
  }, 

  renderRoom: function(room) {
    $('#roomSelect').append($(`<ul>${room}</ul>`));
  },

  handleUsernameClick: function() {
    console.log('username clicked!');
  },

  handleSubmit: function() {

  }  



};

