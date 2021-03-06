/*
variables
*/
var model;
var canvas;
var classNames = [];
var canvas;
var coords = [];
var mousePressed = false;
var answer;
var current_round = 0;
var start_time;
var result_list = [];
var setTimer;
var failCount = 0;
var device = "undefined";

/*
prepare the drawing canvas 
*/
$(function() {
    canvas = window._canvas = new fabric.Canvas('drawing-section');
    canvas.backgroundColor = '#ffffff';
    canvas.isDrawingMode = 0;
    canvas.freeDrawingBrush.color = "black";
    canvas.freeDrawingBrush.width = 6;
    canvas.renderAll();
    //setup listeners 
    canvas.on('mouse:up', function(e) {
        getFrame();
        mousePressed = false
    });
    canvas.on('mouse:down', function(e) {
        mousePressed = true
    });
    canvas.on('mouse:move', function(e) {
        recordCoor(e)
    });
})

/*
set the table of the predictions 
*/
function setTable(top5, probs) {
    //loop over the predictions 
    for (var i = 0; i < top5.length; i++) {
        let sym = document.getElementById('sym' + (i + 1))
        let prob = document.getElementById('prob' + (i + 1))
        sym.innerHTML = top5[i]
        prob.innerHTML = Math.round(probs[i] * 100)
    }
}

/*
record the current drawing coordinates
*/
function recordCoor(event) {
    var pointer = canvas.getPointer(event.e);
    var posX = pointer.x;
    var posY = pointer.y;

    if (posX >= 0 && posY >= 0 && mousePressed) {
        coords.push(pointer)
    }
}

/*
get the best bounding box by trimming around the drawing
*/
function getMinBox() {
    //get coordinates 
    var coorX = coords.map(function(p) {
        return p.x
    });
    var coorY = coords.map(function(p) {
        return p.y
    });

    //find top left and bottom right corners 
    var min_coords = {
        x: Math.min.apply(null, coorX),
        y: Math.min.apply(null, coorY)
    }
    var max_coords = {
        x: Math.max.apply(null, coorX),
        y: Math.max.apply(null, coorY)
    }

    //return as strucut 
    return {
        min: min_coords,
        max: max_coords
    }
}

/*
get the current image data 
*/
function getImageData() {
    //get the minimum bounding box around the drawing 
    const mbb = getMinBox()

    //get image data according to dpi 
    const dpi = window.devicePixelRatio
    const imgData = canvas.contextContainer.getImageData(mbb.min.x * dpi, mbb.min.y * dpi,
                                                    (mbb.max.x - mbb.min.x) * dpi, (mbb.max.y - mbb.min.y) * dpi);
    return imgData
}

function getCurrentTime() {
    return Date.now();
}

/*
get the prediction 
*/
function getFrame() {
    //make sure we have at least two recorded coordinates 
    if (coords.length >= 2) {

        //get the image data from the canvas 
        const imgData = getImageData()

        //get the prediction 
        const pred = model.predict(preprocess(imgData)).dataSync()

        //find the top 5 predictions 
        const indices = findIndicesOfMax(pred, 2)
        const probs = findTopValues(pred, 2)
        const names = getClassNames(indices)
        //set the table 
        //setTable(names, probs)

        console.log(names);
        var drawCheck = checkDrawing(names);
        if(drawCheck) {
            goToNextRound(1);
            console.log("성공");
        }
    }
}

function startTimer(time) {
    setTimer = setInterval(function () {
        console.log(time)
        if (--time < 0) {
            clearInterval(setTimer);
            goToNextRound(0);
            return;
        }
    }, 1000);
}

function getTakenTime() {
    var end_time = getCurrentTime();
    var time_taken = end_time - start_time;
    result_list.push(time_taken);
}

function goToNextRound(result) {
    clearInterval(setTimer);
    if(result == 1) {
        getTakenTime();
        console.log("Round " + (current_round+1) + " success");
    } else {
        console.log("Round " + (current_round+1) + " Failed");
        //result_list[current_round] = "failed";
        failCount++;
    }
    if(current_round == 9) {
        console.log("Test finished");
        console.log(failCount);
        console.log(result_list);
        storeTestResultToFirebase("drawing", device, failCount, result_list);
        return;
    }
    current_round++;
    erase();
    displayMissionWord();
    start_time = getCurrentTime();
    startTimer(10);
    var rount_text = document.getElementById("current-round").textContent;
    document.getElementById("current-round").textContent = parseInt(rount_text) + 1;
}

function checkDrawing(names) {
    if(names.includes(answer)) {
        return true;
    }
    return false;
}

/*
get the the class names 
*/
function getClassNames(indices) {
    var outp = []
    for (var i = 0; i < indices.length; i++)
        outp[i] = classNames[indices[i]]
    return outp
}

/*
load the class names 
*/
async function loadDict() {
    loc = '../static/model_cnn/class_names.txt'
    await $.ajax({
        url: loc,
        dataType: 'text',
    }).done(success);
}

/*
load the class names
*/
function success(data) {
    const lst = data.split(/\n/)
    for (var i = 0; i < lst.length - 1; i++) {
        let symbol = lst[i]
        classNames[i] = symbol
    }
    classNames = removeUnderScore(classNames);
    displayMissionWord();
}

function removeUnderScore(wordlist) {
    for(i in wordlist) {
        if(wordlist[i].includes("_")){
            wordlist[i] = wordlist[i].replace("_", " ");
        }
    }
    return wordlist;
}

/*
get indices of the top probs
*/
function findIndicesOfMax(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function(a, b) {
                return inp[b] - inp[a];
            }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}

/*
find the top 5 predictions
*/
function findTopValues(inp, count) {
    var outp = [];
    let indices = findIndicesOfMax(inp, count)
    // show 5 greatest scores
    for (var i = 0; i < indices.length; i++)
        outp[i] = inp[indices[i]]
    return outp
}

/*
preprocess the data
*/
function preprocess(imgData) {
    return tf.tidy(() => {
        //convert to a tensor 
        let tensor = tf.fromPixels(imgData, numChannels = 1)
        
        //resize 
        const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat()
        
        //normalize 
        const offset = tf.scalar(255.0);
        const normalized = tf.scalar(1.0).sub(resized.div(offset));

        //We add a dimension to get a batch shape 
        const batched = normalized.expandDims(0)
        return batched
    })
}

/*
load the model
*/
async function start() {
    checkDevice();
    //load the model 
    model = await tf.loadModel('../static/model_cnn/model.json')
    
    //warm up 
    model.predict(tf.zeros([1, 28, 28, 1]))
    
    //allow drawing on the canvas 
    allowDrawing()
    
    //load the class names
    await loadDict()
    start_time = getCurrentTime();
    startTimer(10);
}

/*
allow drawing on canvas
*/
function allowDrawing() {
    canvas.isDrawingMode = 1;
    console.log('Model Loaded');
}

function generateRandomNum() {
    return Math.floor((Math.random() * classNames.length) + 0);
}

async function pickMissionWord() {
    var pickedIndex = await generateRandomNum();
    return classNames[pickedIndex];
}

async function displayMissionWord() {
    var word = await pickMissionWord();
    answer = word;
    document.getElementById("draw-word").textContent = word;
    $('#start-captcha').hide();
}

/*
clear the canvs 
*/
function erase() {
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    coords = [];
}

function checkDevice() {
    var filter = "win16|win32|win64|mac|macintel";
    if (navigator.platform) {
        if (filter.indexOf(navigator.platform.toLowerCase()) < 0) {
            //mobile 
            device = 'mobile';
        } else {
            //pc 
            device = 'PC';
        }
    }
}