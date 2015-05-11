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
/*
function sendBackTable( res )
{
    console.log( "sendBackTable" );
    var db = new sqlite.Database( "characterTest.sqlite" );
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
*/

function addUserName( req, res )
{
    var usernames = req.url.split( "?" )[1];
    var username = usernames.split( "=" )[1];
    var db = new sqlite.Database( "characterTest.sqlite" );
    db.run( "INSERT INTO TEST ('Username') VALUES ('"+username +"')",
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

function addResults(req, res){

    var results = req.url.toString().split("=")[1];
    var indv_result = results.toString().split("&");
    console.log(indv_result);
    var db = new sqlite.Database( "characterTest.sqlite" );
    db.run("INSERT INTO TEST ('Choice1' , 'Choice2' , 'Choice3' , 'Choice4' ,'Choice5') VALUES ('"+indv_result[0] +"', '"+indv_result[1] +"' ,'"+indv_result[2] +"' , '"+indv_result[3] +"' ,'"+indv_result[4]+"')",
        function(err){
            console.log("Can't insert to database");
        });
    db.close(
        function() {
                res.writeHead( 200 );
                res.end( "" );
            } );
}

function doTheServer( req, res )
{

    if( req.url.substring( 0, 5 ) == "/add?" )
    {
        addUserName( req, res );
    }
    else if( req.url.substring(0, 12) == "/getResults?" )
    {
        addResults(req, res);
    }
    else if( req.url == "/characterTest_client.js" )
    {
        giveBackFile( "characterTest_client.js", res );
    }
    else
    {
        giveBackFile( "characterTest.html", res );
    }
}

var server = http.createServer( doTheServer );
server.listen( 8080 );
