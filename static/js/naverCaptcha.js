var webRoundCount = 0;
var webFailCount = 0;
var startTimeStamp = 0;
var endTimeStamp = 0;
var timeTaken = [];

//웹이랑 모바일이랑 카운터 분리해야함
var device = "undefined";

$(document).ready(function () {
    getKeyAndRequestImage();

    $("#btnNextCaptcha").click(function () {
        $("#value").val("");
        getKeyAndRequestImage();
    });

    $("#btnSendValidationCheck").click(function () {
        // console.log($("#key").val());
        var sendData = {
            key: $("#key").val(),
            userInput: $("#value").val()
        }
        validationCheck(sendData);
    });
    $("#btnStart").click(function () {
        startTimeStamp = Date.now();
        // console.log("start: " + startTimeStamp);
    });
    $("#btnSuccess").click(function () {
        window.location.href = "main";
    });
    // console.log(getSignInEmail());
    // initialise();
});

// function initialise() {
//     var snapshot='';
//     firebase.auth().onAuthStateChanged(function (user) {
//         if (user) {
//             console.log(getCurrentTestResultToFirebase(device, getSignInEmail())); 
//         }
//     });
// }

function validationCheck(sendData) {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/captchaNaverValidationCheck",
        data: sendData,
        dataType: "json",
        success: function (data) {
            // console.log(data);
            if (data.result == true) {
                endTimeStamp = Date.now();
                timeTaken[webRoundCount] = endTimeStamp - startTimeStamp;
                //store in firebase
                // storeCurrentTestResultToFirebase(device, webFailCount, timeTaken[webRoundCount]);
                // console.log("end: " + endTimeStamp);
                console.log("timeTaken: " + timeTaken);
                doNextRound();
            } else {
                timeTaken[webRoundCount] = "Failed";
                webFailCount++;
                //store in firebase
                // storeCurrentTestResultToFirebase(device, webFailCount, timeTaken[webRoundCount]);
                console.log("timeTaken: " + timeTaken);

                doNextRound();
            }
            console.log("failCount:" + webFailCount);
            console.log("webRoundCount:" + webRoundCount);
        }
    });
}


function getKeyAndRequestImage() {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/captchaNaverGetKey",
        dataType: "json",
        success: function (data) {
            // console.log(data);
            $("#key").val(data.key);
            // console.log($("#key").val());
            var sendKey = {
                key: $("#key").val()
            }
            getImage(sendKey);
        }
    });
}

function getImage(sendKey) {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/captchaNaverGetImage",
        data: sendKey,
        dataType: "json",
        success: function (result) {
            // console.log(result.fileLoc);
            $(".naver-captcha-image-wrapper").empty();
            $(".naver-captcha-image-wrapper").html("<img src='" + result.fileLoc + "'>");
        }
    });
}

function doNextRound() {
    if (webRoundCount == 9) {
        $("#btnSendValidationCheck").attr("disabled", true);
        $("#btnNextCaptcha").attr("disabled", true);
        storeTestResultToFirebase(device, webFailCount, timeTaken);
        
    } else {
        $("#current-round").text(++webRoundCount);
        $("#value").val("");
        getKeyAndRequestImage();
    }
    startTimeStamp = Date.now();
    // console.log("start: " + startTimeStamp);
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