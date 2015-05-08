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

function addUserName( req, res )
{
    var usernames = req.url.split( "?" )[1];
    var username = usernames[0].split( "=" )[1];
    var db = new sqlite.Database( "charaterTest.sqlite" );

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
   /* if( req.url == "/get_table_contents" )
    {
        sendBackTable( res );
    }*/
     if( req.url.substring( 0, 5 ) == "/add?" )
    {
        addUserName( req, res )
    }
    else if( req.url == "/characterTest_client.js" )
    {
        giveBackFile( "characterTest_client.js", res )
    }
    else
    {
        giveBackFile( "characterTest.html", res )
    }
}

var server = http.createServer( doTheServer );
server.listen( 8080 );
