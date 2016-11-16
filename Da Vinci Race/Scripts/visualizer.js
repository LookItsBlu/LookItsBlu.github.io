var canvas, ctx, source, context, analyser, fbc_array, bar_x, bar_height;
    function initVisualizer() {
        context = new AudioContext();
        analyser = context.createAnalyser();
		biquad = context.createBiquadFilter();
		gainNode = context.createGain();
        canvas = document.getElementById("visualizer");
        ctx = canvas.getContext('2d');
		ctx.fillStyle = "#3f3f3f";
		
		
		analyser.smoothingTimeConstant = 0.8;
		biquad.frequency.value = 15000;
		gainNode.gain.value = 1;
		
        source = context.createMediaElementSource(Musique);
		source.connect(biquad);
		biquad.connect(gainNode);
		gainNode.connect(analyser);
        analyser.connect(context.destination);
		
		$("#frequencyNumber").html(biquad.frequency.value);
		$("#visualizerSensibilityNumber").html(analyser.smoothingTimeConstant);
		$("#gainNumber").html(gainNode.gain.value.toPrecision(3));
		
		framelooper()
    }

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

$("#visualizerFPSNumber").html(fps+" FPS");

    function framelooper() {
		
		window.requestAnimationFrame(framelooper);
		
		now = Date.now();
		delta = now - then;
		 
		if (delta > interval) {
			then = now - (delta % interval);
		
			fbcArray = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(fbcArray);
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (i=0; i < bars; i++) {
				bar_x = i * bar_x_spaces + 0.5;
				bar_height = -(fbcArray[i] / bar_height_sensibility);
				
				if (visualizerStyle == 1){
					//Simple
					ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
					$("#visualizerStyleType").html("Simple");
				}
				else if (visualizerStyle == 2) {
					//Reflection
					ctx.fillRect(bar_x, canvas.height/2, bar_width, bar_height/2);
					ctx.fillRect(bar_x, canvas.height/2, bar_width, -bar_height/2);
					$("#visualizerStyleType").html("Reflection");
				}
				else {
					//Two-faced
					ctx.fillRect(0, bar_x, -bar_height, bar_width);
					ctx.fillRect(canvas.width, bar_x, bar_height, bar_width);
					$("#visualizerStyleType").html("Face to Face");
				}
			}
		}
    }