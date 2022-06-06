"use strict";

var gl;

var theta = 0.0;
var theta2 = 0.0;
var theta3 = 0.0;
var thetaLoc;
var thetaLoc2;
var thetaLoc3;

var speed = 100;
var direction = true;
var direction2 = true;
var direction3 = true;

var seats = 10;
var selected = -1;

var positions = [];
var positions2 = [];
var positions3 = [];

var program;
var program2;
var program3;

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    //  Load shaders and initialize attribute buffers

    program = initShaders(gl, "vertex-shader", "fragment-shader");
    program2 = initShaders(gl, "vertex-shader2", "fragment-shader");
    program3 = initShaders(gl, "vertex-shader3", "fragment-shader");

    ferris(seats);
       
    seatss(selected);

    document.getElementById("slider").onchange = function(event) {
      selected = document.getElementById('slider').value;
      var val=document.getElementById('demo');
      seatss(selected);
      val.innerHTML=selected;
  };
};

function ferris(seats) {
  for (var i = 0; i <= seats; i++) {
    positions.push(vec2(0.75*Math.cos(i*2*Math.PI/seats),0.75*Math.sin(i*2*Math.PI/seats)));
    positions.push(vec2(0,0));
    if (i!=0) {
      positions.push(vec2(0.75*Math.cos((i-1)*2*Math.PI/seats),0.75*Math.sin((i-1)*2*Math.PI/seats)));
      positions.push(vec2(0.75*Math.cos(i*2*Math.PI/seats),0.75*Math.sin(i*2*Math.PI/seats)));
    }
  }
  render();
}

function render() {
  gl.useProgram( program );

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var positionLoc = gl.getAttribLocation( program, "aPosition" );
  gl.vertexAttribPointer( positionLoc, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray(positionLoc);

  thetaLoc = gl.getUniformLocation(program, "uTheta");

  theta += (direction ? 0.1 : -0.1);
  gl.uniform1f(thetaLoc, theta);

  gl.drawArrays(gl.LINES, 0, positions.length);

  setTimeout(
      function () {requestAnimationFrame(render);},
      speed
  );
}

function seatss(selected) {
  positions2 = [];
  for (var i = 0; i <= seats; i++) {
    if (i != selected) {
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));
      positions2.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));
    }
    else {
      /*
      var one=vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05);
      var two=vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05);
      var three=vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05);
      var four=vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05);
      var rot = mat2(Math.cos(theta3), -Math.sin(theta3), Math.sin(theta3), Math.cos(theta3));
      var cen1 = vec2(one[0] - one[0]-0.05, one[1] - one[1]-0.05);
      var ted1 = mult(rot, cen1);
      var cen2 = vec2(two[0] - one[0]-0.05, two[1] - one[1]-0.05);
      var ted2 = mult(rot, cen2);
      var cen3 = vec2(three[0] - one[0]-0.05, three[1] - one[1]-0.05);
      var ted3 = mult(rot, cen3);
      var cen4 = vec2(four[0] - one[0]-0.05, four[1] - one[1]-0.05);
      var ted4 = mult(rot, cen4);
      positions.push(vec2(ted1[0]+cen1[0], ted1[1]+cen1[1]), vec2(ted2[0]+cen2[0], ted2[1]+cen2[1]),
                    vec2(ted2[0]+cen2[0], ted2[1]+cen2[1]), vec2(ted3[0]+cen3[0], ted3[1]+cen3[1]),
                    vec2(ted3[0]+cen3[0], ted3[1]+cen3[1]), vec2(ted4[0]+cen4[0], ted4[1]+cen4[1]),
                    vec2(ted4[0]+cen4[0], ted4[1]+cen4[1]), vec2(ted1[0]+cen1[0], ted1[1]+cen1[1]));
      */
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)-0.05));
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)-0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));
      positions3.push(vec2(0.75*Math.cos(i*2*Math.PI/seats)+0.05,0.75*Math.sin(i*2*Math.PI/seats)+0.05));           
    }    
  }
  render2();
}

function render2() {
  gl.useProgram( program2 );

  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT );

  // Load the data into the GPU

  var bufferId2 = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions2), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  
  var positionLoc2 = gl.getAttribLocation( program2, "aPosition2" );
  gl.vertexAttribPointer( positionLoc2, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray(positionLoc2);

  thetaLoc2 = gl.getUniformLocation(program2, "uTheta2");

  theta2 += (direction2 ? 0.1 : -0.1);
  gl.uniform1f(thetaLoc2, theta2);

  gl.drawArrays(gl.LINES, 0, positions2.length);

  if (positions3.length != 0) {

    gl.useProgram( program3 );

    // Load the data into the GPU

    var bufferId3 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId3);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positions3), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
  
    var positionLoc3 = gl.getAttribLocation( program3, "aPosition3" );
    gl.vertexAttribPointer( positionLoc3, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray(positionLoc3);

    thetaLoc3 = gl.getUniformLocation(program3, "uTheta3");

    theta3 += (direction3 ? 0.1 : -0.1);
    gl.uniform1f(thetaLoc3, theta3);

    gl.drawArrays(gl.LINES, 0, positions3.length);
  }
  setTimeout(
    function () {requestAnimationFrame(render2);},
    speed
  );
}

