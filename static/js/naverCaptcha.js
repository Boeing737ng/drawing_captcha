var webRoundCount = 0;
var webFailCount = 0;
var startTimeStamp = 0;
var endTimeStamp = 0;
var timeTaken = [];

var device = "undefined";
//웹이랑 모바일이랑 카운터 분리해야함

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
    $("#btnSuccess").click(function(){
        window.location.href = "main";
    });
});

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
                storeCurrentTestResultToFirebase()
                // console.log("end: " + endTimeStamp);
                console.log("timeTaken: " + timeTaken);
                doNextRound();
            } else {
                timeTaken[webRoundCount]="Failed";
                //store in firebase
                storeCurrentTestResultToFirebase()
                console.log("timeTaken: " + timeTaken);
                webFailCount++;
                doNextRound();
            }
            console.log("failCount:" + webFailCount);
            console.log("webRoundCount:" + webRoundCount);
        }
    });
}
function storeCurrentTestResultToFirebase(){

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
    if (webRoundCount == 10) {
        $("#btnSendValidationCheck").attr("disabled", true);
        $("#btnNextCaptcha").attr("disabled", true);
        alert("드로잉 캡차 10회를 완료하였습니다");
        window.location.href = "main";
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
            alert('mobile 접속');
        } else {
            //pc 
            device = 'PC';
            alert('pc 접속');
        }
    }
}