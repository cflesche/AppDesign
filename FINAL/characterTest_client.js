function dawnOfTime()
{
    fillInTable()
}

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
}

function add()
{
    var addr_elem =
        document.getElementById( "addr" );
    var nick_elem =
        document.getElementById( "nick" );
    var add_sender = new XMLHttpRequest();
    var url = "add?";
    url += "addr=" + addr_elem.value;
    url += "&nick=" + nick_elem.value;
    add_sender.open( "get", url );
    add_sender.onload = addDone;
    add_sender.send();
    // add to HTML table
}
