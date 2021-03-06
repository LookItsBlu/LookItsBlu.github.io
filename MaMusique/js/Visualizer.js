var requestIdVisualizer, requestIdVisualizerIdle;

var canvas, ctx, source, context, analyser, fbc_array, bar_x, bar_height, Musique;
function initVisualizer() {


    context = new AudioContext();
    analyser = context.createAnalyser();
    canvas = document.getElementById("visualizer");
    ctx = canvas.getContext('2d');
    ctx.fillStyle = visualizerColor;
    ctx.strokeStyle = visualizerColor;
    Musique = document.getElementById("Musique");

    if(navigator.userAgent.search("Firefox")) { analyser.smoothingTimeConstant = 0.6; }
    else { analyser.smoothingTimeConstant = 0.4; }

    source = context.createMediaElementSource(Musique);
    source.connect(analyser);
    analyser.connect(context.destination);

    //if(Musique.paused==false){visualizerStart();}
    visualizerStart();
}

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function framelooper() {
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        fbcArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbcArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (i=0; i < bars; i++) {
            bar_x = i * bar_x_spaces + 0.5;

            if(fbcArray[i]<10){fbcArray[i]=10;}

            bar_height = -(fbcArray[i] / bar_height_sensibility);

            ctx.fillRect(bar_x, canvas.height/2, bar_width, bar_height/2, 10);
            ctx.strokeRect(bar_x, canvas.height/2, bar_width, bar_height/2, 10);
            ctx.fillRect(bar_x, canvas.height/2, bar_width, -bar_height/2, 10);
            ctx.strokeRect(bar_x, canvas.height/2, bar_width, -bar_height/2, 10);
        }
    }

    if(Musique.paused==true){
        var allMuted = true;
        for (i=0; i < bars; i++) {
            if(fbcArray[i]>11){
                allMuted = false;
            }
        }
        if(allMuted){ visualizerStop(); return; }
    }

    requestIdVisualizer = window.requestAnimationFrame(framelooper);
}

function visualizerStart() {
    if (!requestIdVisualizer) {
        framelooper();
    }
}

function visualizerStop() {
    if (requestIdVisualizer) {
        window.cancelAnimationFrame(framelooper);
        requestIdVisualizer = undefined;
    }
    size=10;
    visualizerIdleStart();
}




var counter, y, increase, size;
counter = 0, y=0, size=10;
function framelooperIdle() {
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        then = now - (delta % interval);

        fbcArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbcArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (i=0; i < 359; i++) {
            bar_x = i * bar_x_spaces + 0.5;

            if(Musique.paused==true){
                idleSine(i);
            }

            bar_height = -(fbcArray[i] / bar_height_sensibility);
            ctx.fillRect(bar_x, canvas.height/2, bar_width, bar_height/2, 10000);
            ctx.strokeRect(bar_x, canvas.height/2, bar_width, bar_height/2, 10000);
            ctx.fillRect(bar_x, canvas.height/2, bar_width, -bar_height/2, 50);
            ctx.strokeRect(bar_x, canvas.height/2, bar_width, -bar_height/2, 50);
        }
    }

    if(Musique.paused==false){
        var allMuted = true;
        for (i=0; i < 359; i++) {
            if(fbcArray[i]>11){
                allMuted = false;
            }
        }
        if(allMuted){ visualizerIdleStop(); return; }
    }

    requestIdVisualizerIdle = window.requestAnimationFrame(framelooperIdle);
}

function idleSine(i){
    increase = 90/15*Math.PI / 89.77;
    if(size<175){ size*=1.00025; }
    y = Math.sin(counter) * size;
    if(y<0){ y = -y; }
    counter += increase;
    fbcArray[i]=y;
}

function visualizerIdleStart() {
    if (!requestIdVisualizerIdle) {
        size=10;
        framelooperIdle();
    }
}

function visualizerIdleStop() {
    if (requestIdVisualizerIdle) {
        window.cancelAnimationFrame(framelooperIdle);
        requestIdVisualizerIdle = undefined;
    }
}

$("document").ready(function(){
    $("#visualizer").attr("width", window.innerWidth);
    bars = Math.floor(window.innerWidth/(bar_width+(bar_x_spaces-bar_width)));

    $(window).resize(function(){
        $("#visualizer").attr("width", window.innerWidth);
        bars = Math.floor(window.innerWidth/(bar_width+(bar_x_spaces-bar_width)));
    });

    initVisualizer();
});
