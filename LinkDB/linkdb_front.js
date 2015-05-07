var sqlite = require( "sqlite3" );

function addLink(){
  var user_input = document.getElementById("new_link_box");
  var box_input = user_input.value;
  var url = "add_link"+"?"+ box_input;
  var urlSender = new XMLHttpRequest();
  urlSender.open( "get", url );
  urlSender.send();
}

function deleteLink(){
  var table = document.getElementById("link_table");
  var url = "delete_link";
  var urlSender = new XMLHttpRequest();
  urlSender.open( "get", url );
  urlSender.send();
}
