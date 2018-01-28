// YOUR CODE HERE:


var app = {
  
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  username: (/=.*/).exec(window.location.search)[0].slice(1),
  rooms: {},
  friends: {},
  messages: [],
  latestMessageId: '0',
  roomname: 'lobby',

  init: function() {
    //username = (/=.*/).exec(window.location.search)[0].slice(1);

    app.fetch();
    setInterval(function() {
      app.fetch();
    }, 2000);

    $('#send').on('submit', function(event){
      app.handleSubmit(event);
    });

    $(document).on('change', '#roomSelect', app.handleRoomSwitch);
    $('#chats').on('click', '.username', function(event) {
      console.log(event.target.innerHTML);
      app.handleUsernameClick(event.target.innerHTML);
    });
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
        if (app.latestMessageId !== results[results.length - 1].objectId){
          app.messages = results;
          app.latestMessageId = results[results.length - 1].objectId;
          app.renderRoomList();
          app.renderMessages();
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

  renderMessages: function() {
    app.clearMessages();
    app.messages.filter(function(chat) {
      return app.roomname === chat.roomname;
    }).forEach(function(chat){
      app.renderMessage(chat);
    });
  },

  renderMessage: function({username, text, roomname}) {
    var chat = $('<div class="chat"></div>');
    var usrnm = $('<a class=username></a>');
    var textElem = $('<p></p>');
    usrnm.data('u',username);
    textElem.text(text);
    usrnm.text(username);
    chat.append(usrnm);
    chat.append(textElem);
    
    $('#chats').append(chat);
  },

  clearMessages: function() {
    $('#chats').empty();
  }, 
  
  renderRoomList: function() {
    for (var i = 0; i < app.messages.length; i++) {
      if (app.rooms[app.messages[i].roomname] === undefined) {
        app.rooms[app.messages[i].roomname] = true;
        app.renderRoom(app.messages[i].roomname);
      }
    }
  },
  
  handleRoomSwitch: function(){
    app.roomname = $('#roomSelect').val();
    app.renderMessages();
  },

  renderRoom: function(room) {
    var newRoom = $(`<option></option>`);
    newRoom.text(room);
    $('#roomSelect').append(newRoom);
  },

  handleUsernameClick: function(friend) {
     app.friends[friend] = !app.friends[friend];
     $('.username').each(function(){
       if(friend === $(this).data('u')){
        $(this).css('background-color', 'lightblue');
       }
     });
    // console.log(app.friends);
    // var clickedUser = $('.username').filter(function(){
    //   return $(this).data('u') === friend;
    // });
    // for (var i = 0; i < clickedUser.length; i++){

    //   clickedUser[i].css('background-color', 'blue');
    // }
    // console.log(clickedUser);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var data = $('#message').val();
    $('#message').val('');
    //console.log(data);
    console.log(data);
    //console.log(username);
    app.send({username: app.username, text: data, roomname: app.roomname});
  }  
};
$(document).ready(function() {
  console.log('document ready');
  app.init();
  
});
