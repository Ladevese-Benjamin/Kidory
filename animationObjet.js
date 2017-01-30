	var objet;
	var objetImage;
	var canvas;					

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  objet.update();
	  objet.render();
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};
		
		return that;
	}
	
	// Get canvas
	canvas = document.getElementById("objetAnimation");
	canvas.width = 100;
	canvas.height = 138;
	
	// Create sprite sheet
	objetImage = new Image();	
	
	// Create sprite
	objet = sprite({
		context: canvas.getContext("2d"),
		width: 667,
		height: 138,
		image: objetImage,
		numberOfFrames: 10,
		ticksPerFrame: 9
	});
	
	// Load sprite sheet
	objetImage.addEventListener("load", gameLoop);
	objetImage.src = "Media_Visuel/Objets/parchemin-1.png";
