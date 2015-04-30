var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function table_performance(req, res)
{
  var db = new sqlite.Database( "telluride.sqlite" );
  var resp_text = "<!DOCTYPE html>"+
  "<html>" +
  "<body>";
  db.each( "SELECT ID, PERFORMER, STAGE, TIME FROM PERFORMANCE",
    function( err, row ) {
      db.each( "SELECT NAME FROM PERFORMERS WHERE ID = " +
              row.PERFORMER, function( err2, row2 ) {
                  console.log( "Performer: "+row.PERFORMER + " " +
                          row2.NAME );
                  resp_text += "Performer: "+row.PERFORMER + " " +
                          row2.NAME;
                          });
                  console.log( row );
                });
                db.close(
                function() {
           	       console.log( "Complete! "+resp_text );
           	       resp_text += "</body>" + "</html>";
           	       res.writeHead( 200 );
           	       res.end( resp_text );
                  } );
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
    	process.exit( 1 );
    	/* Return a 404 page */
    }

    res.writeHead( 200 );
    res.end( contents );
}

function serverFn( req, res )
{
    var filename = req.url.substring( 1, req.url.length );
    console.log(filename);
    if( filename == "" )
    {
        filename = "./index.html";
    }
    if( filename == "table_performance" )
    {
      table_performance( req, res );
    }
    else
    {
        serveFile( filename, req, res );
    }
}

var server = http.createServer( serverFn );

server.listen( 8080 );
