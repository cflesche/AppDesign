var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function formInputParser( url )
{
    inputs = {}
    var form_text = url.split( "?" )[1];
    var form_inputs = form_text.split( "%" );
    console.log( form_inputs );
    return form_inputs;
}

function addLink(req, res){
  var db = new sqlite.Database( "linkdb.sqlite" );
  var return_info = formInputParser( req.url );
  var sql_cmd = "INSERT INTO LINKS ('LinkAddress', 'Nickname') VALUES ('"+
       return_info[0]+"' , '"+
       return_info[0]+"')";
  db.run( sql_cmd );
  db.close();
  res.writeHead( 200 );
}

function deleteLink(req, res){

}


function serveFile( filename, req, res )
{
    try
    {
    	var contents = fs.readFileSync( filename ).toString();
    }
    catch( e )
    {
    	console.log(
    	    "Error: Something bad happened trying to open "+filename );
        res.writeHead( 404 );
        res.end( "" );
        return;
    }

    res.writeHead( 200 );
    res.end( contents );
}

function serverFn( req, res )
{

    if( req.url.substring(0 , 9) == "/add_link" )
    {
        addLink( req, res );
    }
    else if( req.url  == "/linkdb_front.js" )
    {
        serveFile( "linkdb_front.js",req, res );
    }
    else if( req.url.substring(0,12)  == "/delete_link" )
    {
        deleteLink(req, res );
    }
    else
    {
        serveFile( "index.html", req, res );
    }
}

var server = http.createServer( serverFn );
server.listen( 8080 );
