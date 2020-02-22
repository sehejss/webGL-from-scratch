function drawTexturedCube(gl, n, name) {
	var texture = gl.createTexture();   // Create a texture object
	if (!texture) {
	  	console.log('Failed to create the texture object');
	  	return false;
	}
  
	// Get the storage location of u_Sampler
	var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
	if (!u_Sampler) {
	  	console.log('Failed to get the storage location of u_Sampler');
	  	return false;
	}
	var image = new Image();  // Create the image object
	if (!image) {
		console.log('Failed to create the image object');
	  	return false;
	}
	// Register the event handler to be called on loading an image
	if(name == 'pumpkin') {
		loadTexture(gl, n, texture, u_Sampler, pumpkin);
	} else if(name == 'melon') {
		loadTexture(gl, n, texture, u_Sampler, melon);
	} else if(name == 'sky') {
		loadTexture(gl, n, texture, u_Sampler, sky);
	} else if(name == 'grass') {
		loadTexture(gl, n, texture, u_Sampler, grass);
	}
	return true;
  }

function drawCube(gl, n) {
	//pass in transformation matrix and set
	gl.drawArrays(gl.TRIANGLES, 0, n)
}

function loadTexture(gl, n, texture, u_Sampler, image) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
	// Enable texture unit0
	gl.activeTexture(gl.TEXTURE0);
	// Bind the texture object to the target
	gl.bindTexture(gl.TEXTURE_2D, texture);
  
	// Set the texture parameters
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	// Set the texture image
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	
	// Set the texture unit 0 to the sampler
	gl.uniform1i(u_Sampler, 0);
	gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
}

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

	var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
	if (a_TexCoord < 0) {
		console.log('Failed to get the storage location of a_TexCoord');
		return -1;
	}

	gl.bindTexture(gl.TEXTURE_2D, null);
	gl.disableVertexAttribArray(a_TexCoord);
	return n;
	//gl.drawArrays(gl.TRIANGLES, 0, n);

}

function initTexturedBuffers(gl){
	var vertices_a = [
		// Top
		-1.0,  1.0, -1.0, 	 0, 0,
		-1.0,  1.0,  1.0,    0, 1,
		 1.0,  1.0,  1.0,    1, 1,
		 1.0,  1.0, -1.0,    1, 0,
    
		// Left 
		-1.0,  1.0,  1.0,    1, 1,
		-1.0, -1.0,  1.0,    1, 0,
		-1.0, -1.0, -1.0,    0, 0,
		-1.0,  1.0, -1.0,    0, 1,
 
		// Right 
		 1.0,  1.0,  1.0,    1, 1,
		 1.0, -1.0,  1.0,    1, 0,
		 1.0, -1.0, -1.0,    0, 0,
		 1.0,  1.0, -1.0,    0, 1,

		// Front
		 1.0,  1.0,  1.0,    1, 1,
		 1.0, -1.0,  1.0,    1, 0,
		-1.0, -1.0,  1.0,    0, 0,
		-1.0,  1.0,  1.0,    0, 1,

		// Back
		 1.0,  1.0, -1.0,    1, 1,
		 1.0, -1.0, -1.0,    1, 0,
		-1.0, -1.0, -1.0,    0, 0,
		-1.0,  1.0, -1.0,    0, 1,

		// Bottom
		-1.0, -1.0, -1.0,    1, 1,
		-1.0, -1.0,  1.0,    1, 0,
		 1.0, -1.0,  1.0,    0, 0,
		 1.0, -1.0, -1.0,    0, 1,
	];

	var indices_a = [
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];

	vertices = new Float32Array(vertices_a);
	indices = new Uint16Array(indices_a);
	
	var vertexBuffer = gl.createBuffer();
	var indexBuffer = gl.createBuffer();

	if (!vertexBuffer || !indexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

	var FSIZE = vertices.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return -1;
	}

	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
	gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object
  
	var a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
	if (a_TexCoord < 0) {
		console.log('Failed to get the storage location of a_TexCoord');
		return -1;
	}
	// Assign the buffer object to a_TexCoord variable
	gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 5, FSIZE * 3);
	gl.enableVertexAttribArray(a_TexCoord);  // Enable the assignment of the buffer object

	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color < 0) {
	  console.log('Failed to get the storage location of a_Color');
	  return -1;
	}

	gl.disableVertexAttribArray(a_Color);
	gl.vertexAttrib4f(a_Color, 0, 0, 0, 0);

	return indices.length;
}


function drawFloor(gl){
	var u_transformationMatrix = gl.getUniformLocation(gl.program, 'u_transformMatrix');
	n = initBuffers(gl, 0, 0, 0, 1, [0, 1, 0]);
	flatten = new Matrix4();
	flatten.setScale(32, 0, 32);
	gl.uniformMatrix4fv(u_transformationMatrix, false, flatten.elements);
	drawCube(gl, n);
}

function drawWalls(gl){
	var wallGrid = [
		[1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 1
		[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0], //row 6
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 12
		[0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 18
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 24
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 30
		[0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //row 36
	]//col1						  	  col6
	var i;
	for(i = 0; i < 32; i++) {
		var j;
		for(j = 0; j < 32; j++) {
			if (wallGrid[i][j] > 0) {
				var height = wallGrid[i][j];
				for (k = 1; k <= height; k++) {
					var u_transformationMatrix = gl.getUniformLocation(gl.program, 'u_transformMatrix');
					n = initTexturedBuffers(gl, 0, 0, 0, 1);
					flatten = new Matrix4();
					flatten.setScale(1, 1, 1)
					flatten.translate(j-(31-j), step(k), i-(31-i));
					gl.uniformMatrix4fv(u_transformationMatrix, false, flatten.elements);
					if(((i+j) % 2) == 0) {
						drawTexturedCube(gl, n, 'melon');
					} else {
						drawTexturedCube(gl, n, 'pumpkin');
					}
				}
			}
		}
	}
}

function drawSky(gl){
	var u_transformationMatrix = gl.getUniformLocation(gl.program, 'u_transformMatrix');
	n = initBuffers(gl, 0, 0, 0, 1, [0, 0, 1]);
	flatten = new Matrix4();
	flatten.setScale(32, 64, 32);
	gl.uniformMatrix4fv(u_transformationMatrix, false, flatten.elements);
	drawCube(gl, n);
}

function drawScene(gl) {
	drawFloor(gl);
	drawWalls(gl);
	drawSky(gl);
}

function step(num) {
	switch(num) {
		case 1:
			return 1;
		case 2:
			return 3;
		case 3:
			return 5;
		case 4:
			return 7;
	}
}


