// YOUR CODE HERE:
var app = {
  constructor(){
    url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  },

  init: function() {
    app.fetch();
  },

  fetch: function() {
    // console.log('fetching...');
    // $.get('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', 
    // function({results}){
      //   for (var i = 0; i < results.length; i++) {
        //     app.renderMessage(results[i]);
        //   }
        // });
    console.log('fetching...')
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: { 
        order: '-createdAt'
      },
      contentType: 'json',
      success: function({results}) {
        app.clearMessages();
        for (var i = 0; i < results.length; i++) {
          app.renderMessage(results[i]);
        }
      },
      error: function(data) {
        console.log('error!');
      }
    });
  },

  send: function(value) {
    $.post('http://parse.sfm6.hackreactor.com/chatterbox/classes/messages', value);
    // $.ajax({
    // // This is the url you should use to communicate with the parse API server.
    //   url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    //   type: 'POST',
    //   data: value,
    //   contentType: 'application/json',
    //   success: function (data) {
    //     console.log('chatterbox: Message sent');
    //   },
    //   error: function (data) {
    //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    //     console.error('chatterbox: Failed to send message', data);
    //   }
    // });
  },

  renderMessage: function({username, text, roomname}) {
    var chat = $(`<div class='chat'></div>`);
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
    $('#roomSelect').append($(`<ul>${room}</ul>`));
  },

  handleUsernameClick: function() {
    console.log('username clicked!');
  },

  handleSubmit: function() {

  }  
};

$(document).ready(function(){
  console.log('document ready');
  app.init();

  setInterval(function(){
    app.fetch();
  }, 5000);
});
