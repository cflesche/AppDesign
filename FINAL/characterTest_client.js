/*
function fillInTable()
{
    var value_req = new XMLHttpRequest();
    value_req.onload = tableReturned;
    value_req.open( "get", "get_table_contents" );
    value_req.send();
}

function tableReturned()
{
    var rows = JSON.parse( this.responseText );
    console.log( rows );
    var table_elem = document.getElementById( "the_table" );
    for( var i = 0; i < rows.length; i++ )
    {
        var row_elem = document.createElement( "tr" );
        var addr_elem = document.createElement( "td" );
        var nick_elem = document.createElement( "td" );
        if( true )
        {
            var link_elem = document.createElement( "a" );
            link_elem.href = rows[i].Link;
            link_elem.innerHTML = rows[i].Link;
            addr_elem.appendChild( link_elem );
        }
        else
        {
            addr_elem.innerHTML =
                "<a href='"+rows[i].Link+"'>"+
                rows[i].Link+"</a>";
        }
        nick_elem.innerHTML = rows[i].Nick;
        row_elem.appendChild( addr_elem );
        row_elem.appendChild( nick_elem );
        table_elem.appendChild( row_elem );
    }
}

function removeAllChildren( html_elem )
{
    while( html_elem.firstChild )
    {
        html_elem.removeChild( html_elem.firstChild );
    }
}

function addDone()
{
    console.log( "allDone" );
    var table_elem = document.getElementById( "the_table" );
    removeAllChildren( table_elem );
    fillInTable();
} */


function addResults()
{
    var result_elem =
        document.getElementById( "results" );
    var results_sender = new XMLHttpRequest();
    var results = "/results?";
    results += "results=" + result_elem.value;
    console.log(results);
    name_sender.open( "get", results );
    //name_sender.onload = addDone;
    name_sender.send();

}

function getAnswers()
{
  var answer_elem1 =
    document.querySelector('input[name="q1"]:checked').value;
  var answer_elem2 =
    document.querySelector('input[name="q2"]:checked').value;
  var answer_elem3 =
    document.querySelector('input[name="q3"]:checked').value;
  var answer_elem4 =
    document.querySelector('input[name="q4"]:checked').value;
  var answer_elem5 =
    document.querySelector('input[name="q5"]:checked').value;
  var user_elem =
    document.getElementById( "username" );


  var results_sender = new XMLHttpRequest();
  var url = "/add?";
  url += "username=" + user_elem.value;
  url += "/getResults?";
  url += answer_elem1+"&"+answer_elem2+"&"+answer_elem3
      +"&"+answer_elem4+"&"+answer_elem5;
  console.log(url);
  results_sender.open("get", url);
  results_sender.send();
}

function getResults(){
    var info_request = new XMLHttpRequest();
    info_request.onload = showResults;
    info_request.open("get", "getMatch")
    info_request.send();
}

function showResults(){
  var matches = JSON.parse(this.responseText);
  var url = "/finalPage?";
}
