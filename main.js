img = "";
status = "";
objects = [];
song = "";

function preload() {
    song = loadSound('FM9B3TC-alarm.mp3');
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide();
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}
function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 640, 420);

        if (status != "") {

            r = random(255);
            g = random(255);
            b = random(255);

            objectDetector.detect(video, gotResult);
            for(i = 0; i < objects.length; i++) {
                document.getElementById("status").innerHTML = "Status : Object Detected";
                document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

                fill(r,g,b);
                percent = floor(objects[i].confidence *100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 15);
                noFill();
                stroke(r,g,b);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

                if(objects[i].label == "person") {
                    document.getElementById("number_of_objects").innerHTML = "Baby Detected";
                    song.stop();
                 }
                 else {
                     document.getElementById("number_of_objects").innerHTML = "Baby Not Detected";
                     song.play();
                     song.volume(0.2);
                 }
            }

            
            if(objects.length < 0) {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Detected";
                song.play();
                song.volume(0.2);
            }

}

}