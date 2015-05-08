var fs     = require( "fs" );
var http   = require( "http" );
var sqlite = require( "sqlite3" );

function giveBackFile( name, res )
{
    var contents = "";
    try {
    	contents = fs.readFileSync( name ).toString();
    }
    catch( e ) {
    	console.log(
    	    "Error: Something bad happened trying to open "+name );
        res.writeHead( 404 );
        res.end( "" );
        return;
    }

    res.writeHead( 200 );
    res.end( contents );
}

function sendBackTable( res )
{
    console.log( "sendBackTable" );
    var db = new sqlite.Database( "linkdb.sqlite" );
    var rows = null;
    db.all( "SELECT * FROM Links",
        function( err, r ) {
            if( err === null )
            {
                rows = r;
            }
            else
            {
                console.log( "Error in sendBackTable" );
                console.log( err );
            }
        } );
    db.close(
        function() {
            res.writeHead( 200 );
            if( rows === null )
            {
                res.end( JSON.stringify( rows ) );
            }
            else
            {
                res.end( "Uh oh" );
            }
        }
    );
}

function add( req, res )
{
    var addr_and_nick = req.url.split( "?" )[1];
    var addr_and_nick_arr = addr_and_nick.split( "&" );
    var addr = addr_and_nick_arr[0].split( "=" )[1];
    var nick = addr_and_nick_arr[1].split( "=" )[1];
    var db = new sqlite.Database( "linkdb.sqlite" );

    db.run( "INSERT INTO Links ('Link','Nick') VALUES ('"+
            addr +"', '"+nick+"')",
        function( err ) {
            if( err !== null )
            {
                console.log( "Error in add" );
                console.log( err );
            }
        } );
    db.close(
        function() {
            res.writeHead( 200 );
            res.end( "" );
        } );
}

function doTheServer( req, res )
{
    // console.log( "doTheServer " + req.url );
    if( req.url == "/get_table_contents" )
    {
        sendBackTable( res );
    }
    else if( req.url.substring( 0, 5 ) == "/add?" )
    {
        add( req, res )
    }
    else if( req.url == "/linkdb_client.js" )
    {
        giveBackFile( "linkdb_client.js", res )
    }
    else
    {
        giveBackFile( "linkdb.html", res )
    }
}

var server = http.createServer( doTheServer );
server.listen( 8080 );
