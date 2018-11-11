/**
	Base code for L-systems from https://rosettacode.org/wiki/Fractal_tree#JavaScript
**/

var deg_to_rad = Math.PI / 180.0;
var depth = 9;
	
window.onload = function init(){
	
	var canvas = document.getElementById( "gl-canvas" );
	
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	 
	drawTree(300, 500, -90, depth);
	
	//
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.5, 0.5, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
}

function drawLine(x1, y1, x2, y2, brightness){
	  moveTo(x1, y1);
	  lineTo(x2, y2);
	}
	 
function drawTree(x1, y1, angle, depth){
  if (depth !== 0){
	var x2 = x1 + (Math.cos(angle * deg_to_rad) * depth * 10.0);
	var y2 = y1 + (Math.sin(angle * deg_to_rad) * depth * 10.0);
	drawLine(x1, y1, x2, y2, depth);
	drawTree(x2, y2, angle - 20, depth - 1);
	drawTree(x2, y2, angle + 20, depth - 1);
  }
}
