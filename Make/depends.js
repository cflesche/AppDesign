/* Run jshint clean!!! */

var fs = require( "fs" );

/* What if the user doesn't type the right number of arguments? */

var args = process.argv;
if(args.length < 4){
  console.log("File Input and Target Required");
  process.exit(1);
}

/* What if the file doesn't exist? */
try{
  var lines = fs.readFileSync( args[2] ).toString().split( "\n" );
}
catch(e){
  console.log("Error, something bad happened trying to open "+ args[2]);
  process.exit(1);
}
var targets = {};

for( var i = 0; i < lines.length; i++ )
{
    var target = {};
    var line = lines[ i ];
    console.log( line );
    /* What about format errors in the input file? */
    /* Consider using regexes instead of split */
    /* line.match( ??? ) */
    var colon = line.split( ":" );
    if( colon.length != 2 )
    {
        continue;
    }
    target.name = colon[ 0 ];
    target.depend_names = colon[ 1 ].split( " " );
    /* What if there's no target for a dependency? */
    target.visited = false;
    targets[ target.name ] = target;
}

console.log( targets );

function trace_dependencies( prev, target )
{
    /* what if prev and target are not the right kind of thing?
    if( !( ( typeof prev ) == "string" ) )
    {
         ...
    }
    if( visited in target )
    {
         ...
    }
     ...

    if( target.visited )
    {
        // console.log( "Already visited "+target.name );
        return;
    }
     "else" */

    target.visited = true;
    console.log( "> " + prev + " depends on " + target.name );
    for( var i = 0; i < target.depend_names.length; i++ )
    {
        var dep_name = target.depend_names[ i ];
        if( !( dep_name in targets ) )
            continue;
        var dep = targets[ dep_name ];
        // if( date( dep ) older than date( target ) )
        //    continue;
        trace_dependencies( target.name, dep );
        // trace_dependencies( {l:12, m:34}, "hello" );
    }
}

/* What if the target given at the command line doesn't exist? */
trace_dependencies( "[ Start ]", targets[ args[3] ] );
