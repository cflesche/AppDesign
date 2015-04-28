var fs = require( 'fs' );
var http = require('http');
var fs   = require('fs');

if( process.argv.length < 3 )
{
    console.log( "Error: File path required" );
    process.exit( 1 );
}

var fn1 = process.argv[ 2 ];


try
{
    var lines1 = fs.readFileSync( fn1 ).toString().split( "\n" );
}
catch( e )
{
    console.log(
        "Error: Something bad happened trying to open "+
            fn1+" and "+fn2 );
    process.exit( 1 );
}

var download = function( url, dest, cb ) {
    console.log( "Download!" );
    var file = fs.createWriteStream( dest );

    var request = http.get( url, function( response ) {
        console.log( "get callback!" );
        response.pipe( file );
        file.on( 'finish', function() {
            console.log( "finish callback!" );
            // close() is async, call cb after close completes.
            file.close( cb );
        });
    });
    console.log( "called http.get" );
    request.on( 'error', function( err ) { // Handle errors
        console.log( "error callback!" );
        // Delete the file async. (But we don't check the result)
        fs.unlink(dest);
        if( cb )
            cb( err.message );
    });
    console.log( "called request.on" );
};

for(var i = 0; i < lines1.length;i+=2){
  console.log(lines1[i]);
  download(lines1[i], lines1[i+1],function() { console.log( "main cb" ) });

}
