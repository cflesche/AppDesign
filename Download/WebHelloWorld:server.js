var http = require( "http" );

function serverFn( req, res )
{
    for( field in req )
    {
        //console.log( "R."+field+" = ..."/*+req[ field ]*/ );
    }
    for( field in req.headers )
    {
        //console.log( "R.header."+field+" = ..."/*+req[ field ]*/ );
    }
    console.log( "url: "+req.url.toString() );

    if( req.url.substring( 0, 16 ) == "/submit_the_form" )
    {
        var fullString = req.url.split("=");
        var stringSplit = fullString[1].split("+");
        console.log(stringSplit);
        //var newContents = file_put_contents('log.txt', stringSplit, APPEND_FILE);
    }

    res.writeHead( 200 );
    var h = "<!DOCTYPE html>"+
        "<html>"+
        "<body>"+
        "<form action='submit_the_form' method='get'>"+
        "<input name='textbox' type='text' value='write something'>"+
        "<input type='submit'>"+
        "</form>"+
        "<?php echo file_put_contents('log.txt', stringSplit, APPEND_FILE)?>"+
        "</body>"+
        "</html>";
    res.end( h );

}

var server = http.createServer( serverFn );

server.listen( 8080 );
