
function initBuffers(gl, x, y, z, size, rgb){
	R = rgb[0]
	G = rgb[1]
	B = rgb[2]
	var vertices_a = [
		//back face                        
		x-size, y+size, z+size, R, G, B,
		x+size, y+size, z+size,	R, G, B,
		x-size, y-size, z+size, R, G, B,
		x-size, y-size, z+size,	R, G, B,
		x+size, y+size, z+size,	R, G, B,
		x+size, y-size, z+size,	R, G, B,
		//front face              
		x-size, y+size, z-size, R-.15, G-.15, B-.15,
		x+size, y+size, z-size, R-.15, G-.15, B-.15,
		x-size, y-size, z-size, R-.15, G-.15, B-.15,
		x-size, y-size, z-size, R-.15, G-.15, B-.15,
		x+size, y+size, z-size, R-.15, G-.15, B-.15,
		x+size, y-size, z-size, R-.15, G-.15, B-.15,
		//right face                
		x-size, y+size, z+size, R-.30, G-.30, B-.30,
		x-size, y+size, z-size, R-.30, G-.30, B-.30,
		x-size, y-size, z+size, R-.30, G-.30, B-.30,
		x-size, y-size, z+size, R-.30, G-.30, B-.30,
		x-size, y+size, z-size, R-.30, G-.30, B-.30,
		x-size, y-size, z-size, R-.30, G-.30, B-.30,
		//left face               
		x+size, y+size, z+size, R-.45, G-.45, B-.45,
		x+size, y+size, z-size, R-.45, G-.45, B-.45,
		x+size, y-size, z+size, R-.45, G-.45, B-.45,
		x+size, y-size, z+size, R-.45, G-.45, B-.45,
		x+size, y+size, z-size, R-.45, G-.45, B-.45,
		x+size, y-size, z-size, R-.45, G-.45, B-.45,
		//top face                 
		x-size, y+size, z-size, R-.60, G-.60, B-.60,
		x+size, y+size, z-size, R-.60, G-.60, B-.60,
		x-size, y+size, z+size, R-.60, G-.60, B-.60,
		x-size, y+size, z+size, R-.60, G-.60, B-.60,
		x+size, y+size, z-size, R-.60, G-.60, B-.60,
		x+size, y+size, z+size, R-.60, G-.60, B-.60,
		//bottom face              
		x-size, y-size, z-size, R-.75, G-.75, B-.75,  
		x+size, y-size, z-size, R-.75, G-.75, B-.75,
		x-size, y-size, z+size, R-.75, G-.75, B-.75,
		x-size, y-size, z+size, R-.75, G-.75, B-.75,
		x+size, y-size, z-size, R-.75, G-.75, B-.75,
		x+size, y-size, z+size, R-.75, G-.75, B-.75
	];
	var n = 36; // The number of vertices
	
	//vertices = vertices.concat(vertices_a)
	vertices = new Float32Array(vertices_a)
	
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	var FSIZE = vertices.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return -1;
	}

	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object
  
	// Get the storage location of a_Position, assign buffer and enable
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color < 0) {
	  console.log('Failed to get the storage location of a_Color');
	  return -1;
	}
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object
	//console.log(vertices)
	return n;
	//gl.drawArrays(gl.TRIANGLES, 0, n);

}

function globalTransform() {
	matrix = new Matrix4();
	matrix.setTranslate(0, 0.4, 0);
	matrix.scale(0.5, 0.5, 0.5);
	return matrix;
}

function drawCube(gl, n, transform) {
	//pass in transformation matrix and set
	gl.drawArrays(gl.TRIANGLES, 0, n)
}

function drawHead(gl){

	var u_transformMatrix = gl.getUniformLocation(gl.program, 'u_transformMatrix');

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	headTransform = globalTransform();
	headTransform.translate(0, 0.3, 0);
	headTransform.scale(1, 2.0, 1)
	gl.uniformMatrix4fv(u_transformMatrix, false, headTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	headTransform2 = globalTransform();
	headTransform2.translate(0, 0.5, 0);
	headTransform2.scale(2, 1, 1.25)
	gl.uniformMatrix4fv(u_transformMatrix, false, headTransform2.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	neckTransform = globalTransform();
	neckTransform.translate(0, -0.1, 0);
	neckTransform.scale(.35, 1, .35)
	gl.uniformMatrix4fv(u_transformMatrix, false, neckTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	noseTransform = globalTransform();
	noseTransform.translate(0, 0.01, 0.175);
	noseTransform.scale(0.4, 1, 0.3)
	gl.uniformMatrix4fv(u_transformMatrix, false, noseTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0, 0, 0]);
	mouthTransform = globalTransform();
	mouthTransform.translate(0, 0, 0.05);
	mouthTransform.scale(1.75, 0.03, 1)
	gl.uniformMatrix4fv(u_transformMatrix, false, mouthTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	chinTransform = globalTransform();
	chinTransform.translate(0, 0, 0);
	chinTransform.scale(2, 0.25, 1.25)
	gl.uniformMatrix4fv(u_transformMatrix, false, chinTransform.elements);
	drawCube(gl, n, 0);
	
	n = initBuffers(gl, 0, 0, 0, 0.15, [0.15, 0.77, 0.71]);
	leftEyelidTransform = globalTransform();
	leftEyelidTransform.translate(0.075, 0.3, 0.125);
	leftEyelidTransform.scale(0.3, 0.3, 0.4)
	gl.uniformMatrix4fv(u_transformMatrix, false, leftEyelidTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.15, 0.77, 0.71]);
	rightEyelidTransform = globalTransform();
	rightEyelidTransform.translate(-0.075, 0.3, 0.125);
	rightEyelidTransform.scale(0.3, 0.3, 0.4)
	gl.uniformMatrix4fv(u_transformMatrix, false, rightEyelidTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [1, 1, 0.8]);
	leftEyeTransform = globalTransform();
	leftEyeTransform.translate(0.075, 0.25, 0.125);
	leftEyeTransform.scale(0.25, 0.6, 0.3)
	gl.uniformMatrix4fv(u_transformMatrix, false, leftEyeTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [1, 1, 0.8]);
	rightEyeTransform = globalTransform();
	rightEyeTransform.translate(-0.075, 0.25, 0.125);
	rightEyeTransform.scale(0.25, 0.6, 0.3)
	gl.uniformMatrix4fv(u_transformMatrix, false, rightEyeTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.6, 0, 0.3]);
	leftPupilTransform = globalTransform();
	leftPupilTransform.translate(0.075, 0.25, 0.13);
	leftPupilTransform.scale(0.1, 0.4, 0.3)
	gl.uniformMatrix4fv(u_transformMatrix, false, leftPupilTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.6, 0, 0.3]);
	rightPupilTransform = globalTransform();
	rightPupilTransform.translate(-0.075, 0.25, 0.13);
	rightPupilTransform.scale(0.1, 0.4, 0.3)
	gl.uniformMatrix4fv(u_transformMatrix, false, rightPupilTransform.elements);
	drawCube(gl, n, 0);
}

function drawBody(gl){

	var u_transformMatrix = gl.getUniformLocation(gl.program, 'u_transformMatrix');

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.92, 0.67, 0.12]);
	bodyTransform = globalTransform();
	bodyTransform.translate(0, -0.75, 0);
	bodyTransform.scale(1.25, 3.25, 1)
	gl.uniformMatrix4fv(u_transformMatrix, false, bodyTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	buttTransform = globalTransform();
	buttTransform.translate(0, -1.1, 0);
	buttTransform.scale(1.3, 1, 1.2)
	gl.uniformMatrix4fv(u_transformMatrix, false, buttTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	leg1Transform = globalTransform();
	leg1Transform.translate(0.1, -1.7, 0.1);
	leg1Transform.scale(0.4, 3, 0.4);
	leg1Transform.rotate(45, 0, 1 , 0);
	gl.uniformMatrix4fv(u_transformMatrix, false, leg1Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	foot1Transform = globalTransform();
	foot1Transform.rotate(45, 0, 1, 0);
	foot1Transform.translate(0, -2.07, 0.2);
	foot1Transform.rotate(-20, 1, 0, 0);
	foot1Transform.scale(0.75, 0.5, 1);
	gl.uniformMatrix4fv(u_transformMatrix, false, foot1Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	leg2Transform = globalTransform();
	leg2Transform.translate(0.1, -1.7, -0.1);
	leg2Transform.scale(0.4, 3, 0.4);
	leg2Transform.rotate(135, 0, 1 , 0);
	gl.uniformMatrix4fv(u_transformMatrix, false, leg2Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	foot2Transform = globalTransform();
	foot2Transform.rotate(135, 0, 1, 0);
	foot2Transform.translate(0, -2.07, 0.2);
	foot2Transform.rotate(-20, 1, 0, 0);
	foot2Transform.scale(0.75, 0.5, 1);
	gl.uniformMatrix4fv(u_transformMatrix, false, foot2Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	leg3Transform = globalTransform();
	leg3Transform.translate(-0.1, -1.7, -0.1);
	leg3Transform.scale(0.4, 3, 0.4);
	leg3Transform.rotate(225, 0, 1 , 0);
	gl.uniformMatrix4fv(u_transformMatrix, false, leg3Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	foot3Transform = globalTransform();
	foot3Transform.rotate(225, 0, 1, 0);
	foot3Transform.translate(0, -2.07, 0.2);
	foot3Transform.rotate(-20, 1, 0, 0);
	foot3Transform.scale(0.75, 0.5, 1);
	gl.uniformMatrix4fv(u_transformMatrix, false, foot3Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	leg4Transform = globalTransform();
	leg4Transform.translate(-0.1, -1.7, 0.1);
	leg4Transform.scale(0.4, 3, 0.4);
	leg4Transform.rotate(315, 0, 1 , 0);
	gl.uniformMatrix4fv(u_transformMatrix, false, leg4Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	foot4Transform = globalTransform();
	foot4Transform.rotate(315, 0, 1, 0);
	foot4Transform.translate(0, -2.07, 0.2);
	foot4Transform.rotate(-20, 1, 0, 0);
	foot4Transform.scale(0.75, 0.5, 1);
	gl.uniformMatrix4fv(u_transformMatrix, false, foot4Transform.elements);
	drawCube(gl, n, 0);


}

function drawLeftArm(gl, angle1){

	a1 = countBackDown(90, angle1);

	var u_transformMatrix = gl.getUniformLocation(gl.program, 'u_transformMatrix');

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.92, 0.67, 0.12]);
	leftSleeveTransform = globalTransform();
	leftSleeveTransform.translate(.25, -.4, 0);
	leftSleeveTransform.rotate(-a1, 1, 0, 0);
	leftSleeveTransform.scale(0.5, 0.75, 0.6)
	gl.uniformMatrix4fv(u_transformMatrix, false, leftSleeveTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	leftArm1Transform = globalTransform();
	
	leftArm1Transform.translate(.25, -.4, 0);
	leftArm1Transform.rotate(-a1, 1, 0, 0);
	leftArm1Transform.translate(0, -.2, 0);
	leftArm1Transform.scale(0.45, 1.25, 0.55)
	
	gl.uniformMatrix4fv(u_transformMatrix, false, leftArm1Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	leftArm2Transform = globalTransform();

	leftArm2Transform.translate(.25, -.4, 0);
	leftArm2Transform.rotate(-a1, 1, 0, 0);
	leftArm2Transform.translate(0, -.2, 0);
	leftArm2Transform.translate(0, -.3, 0);
	leftArm2Transform.rotate(-a1, 0, 0, 1);
	leftArm2Transform.scale(0.45, 1.25, 0.55)

	gl.uniformMatrix4fv(u_transformMatrix, false, leftArm2Transform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	leftHandTransform = globalTransform();

	leftHandTransform.translate(.25, -.4, 0);
	leftHandTransform.rotate(-a1, 1, 0, 0);
	leftHandTransform.translate(0, -.2, 0);
	leftHandTransform.translate(0, -.3, 0);
	leftHandTransform.rotate(-a1, 0, 0, 1);
	leftHandTransform.translate(0, -.2, 0);
	leftHandTransform.scale(0.5, 0.75, 0.75)

	gl.uniformMatrix4fv(u_transformMatrix, false, leftHandTransform.elements);
	drawCube(gl, n, 0);

}

function drawRightArm(gl, angle1) {

	a1 = countBackDown(120, angle1);

	var u_transformMatrix = gl.getUniformLocation(gl.program, 'u_transformMatrix');

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.92, 0.67, 0.12]);
	rightSleeveTransform = globalTransform();
	rightSleeveTransform.translate(-.25, -.4, 0);
	rightSleeveTransform.rotate(-a1, 0, 0, 1);
	rightSleeveTransform.scale(0.5, 0.75, 0.6);
	gl.uniformMatrix4fv(u_transformMatrix, false, rightSleeveTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	rightArmTransform = globalTransform();

	rightArmTransform.translate(-.25, -.4, 0);
	rightArmTransform.rotate(-a1, 0, 0, 1);
	rightArmTransform.translate(0, -.35, 0);
	rightArmTransform.scale(0.45, 2.5, 0.55)
	gl.uniformMatrix4fv(u_transformMatrix, false, rightArmTransform.elements);
	drawCube(gl, n, 0);

	n = initBuffers(gl, 0, 0, 0, 0.15, [0.25, 0.87, 0.81]);
	rightHandTransform = globalTransform();

	rightHandTransform.translate(-.25, -.4, 0);
	rightHandTransform.rotate(-a1, 0, 0, 1);
	rightHandTransform.translate(0, -.35, 0);
	rightHandTransform.translate(0, -.3, 0);
	rightHandTransform.scale(0.5, 0.75, 0.75)
	gl.uniformMatrix4fv(u_transformMatrix, false, rightHandTransform.elements);
	drawCube(gl, n, 0);
}

function drawCreature(gl, headAngle, upperLeftArmAngle, rightArmAngle) {

	headAngle45 = countBackDown(45, headAngle);

	var u_animateMatrix = gl.getUniformLocation(gl.program, 'u_animateRotate');
	animateMe = new Matrix4()
	animateMe.setRotate(headAngle45-15, 1, 0, 0);
	animateMe.rotate(-headAngle45, 0, 1, 0);
	gl.uniformMatrix4fv(u_animateMatrix, false, animateMe.elements);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	drawHead(gl)

	animateMe.setRotate(0, 1, 1, 1);
	gl.uniformMatrix4fv(u_animateMatrix, false, animateMe.elements);

	drawLeftArm(gl, upperLeftArmAngle);
	drawRightArm(gl, rightArmAngle);
	drawBody(gl)
}
