var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function listAssignments( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>"+
  "<table>" +
  "<tbody>" +
  "<tr>";
  db.each( "SELECT CLASSES.NAME as cName, * FROM TEACHINGASSIGNMENTS "+
          "JOIN CLASSES ON CLASSES.ID = TEACHINGASSIGNMENTS.CLASSID " +
          "JOIN TEACHERS ON TEACHERS.ID = TEACHINGASSIGNMENTS.TEACHERID",
    function( err, row ) {
	       resp_text += "<td>"+ "Class Name:"+ row.cName + "</td>"
                      + "<td>" + "Teacher Name:"+ row.NAME + "</td>";
         resp_text += "</tr>"
       });
    db.close(
	   function() {
	       resp_text += "</tbody>"+ "</table>"+"</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listEnrollments( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>"+
  "<table>" +
  "<tbody>" +
  "<tr>";
  db.each( "SELECT CLASSES.NAME as cName, * FROM ENROLLMENTS "+
          "JOIN CLASSES ON CLASSES.ID = ENROLLMENTS.CLASSID " +
          "JOIN STUDENTS ON STUDENTS.ID = ENROLLMENTS.STUDENTID",

    function( err, row ) {
	       resp_text += "<td>"+ "Class Name:"+ row.cName + "</td>"
                      + "<td>" + "Student Name:"+ row.NAME + "</td>";
         resp_text += "</tr>"
       });
    db.close(
	   function() {
	       resp_text += "</tbody>"+ "</table>"+"</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listClasses( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>"+
  "<table>" +
  "<tbody>" +
  "<tr>";
  db.each( "SELECT NAME, DEPARTMENT FROM CLASSES", function( err, row ) {
	       resp_text += "<td>"+ "Class Name:"+ row.NAME + "</td>"
                      + "<td>" + "Department:"+ row.DEPARTMENT + "</td>";
         resp_text += "</tr>"
       });
    db.close(
	   function() {
	       resp_text += "</tbody>"+ "</table>"+"</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listStudents( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>"+
  "<table>" +
  "<tbody>" +
  "<tr>";
  db.each( "SELECT NAME, YEAR FROM STUDENTS", function( err, row ) {
	       resp_text += "<td>"+ "Student:"+ row.NAME + "</td>"
                      + "<td>" + "Year:"+ row.YEAR + "</td>";
         resp_text += "</tr>"
       });
    db.close(
	   function() {
	       resp_text += "</tbody>"+ "</table>"+"</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listTeachers( req, res )
{
    var db = new sqlite.Database( "school.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>"+
  "<table>" +
  "<tbody>" +
  "<tr>";
  db.each( "SELECT NAME, OFFICE FROM TEACHERS", function( err, row ) {
	       resp_text += "<td>"+ "Teacher:"+ row.NAME + "</td>"
                      + "<td>" + "Office:"+ row.OFFICE + "</td>";
         resp_text += "</tr>"
       });
    db.close(
	   function() {
	       resp_text += "</tbody>"+ "</table>"+"</body>" + "</html>";
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
        res.writeHead( 404 );
        res.end( "" );
        return;
    }

    res.writeHead( 200 );
    res.end( contents );
}

function serverFn( req, res )
{
    var filename = req.url.substring( 1, req.url.length );
    if( filename == "" )
    {
        filename = "./index.html";
    }
    if( filename.substring( 0, 13 ) == "list_students" )
    {
        listStudents( req, res );
    }
    else if( filename.substring( 0, 13 ) == "list_teachers" )
    {
        listTeachers( req, res );
    }
    else if( filename.substring( 0, 12 ) == "list_classes" )
    {
        listClasses( req, res );
    }
    else if( filename.substring( 0, 16 ) == "list_enrollments" )
    {
        listEnrollments( req, res );
    }
    else if( filename.substring( 0, 16 ) == "list_assignments" )
    {
        listAssignments( req, res );
    }
    else
    {
        serveFile( filename, req, res );
    }
}

var server = http.createServer( serverFn );

server.listen( 8080 );
