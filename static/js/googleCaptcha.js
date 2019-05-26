var startTimeStamp = 0;
var webRoundCount = 0;
var webFailCount = 0;
var endTimeStamp = 0;
var timeTaken = [];
var typeOfCaptcha = "google";
var URL='http://13.209.6.91:80/';

var device = "undefined";

var widgetId1;
var onloadCallback = function() {
widgetId1 = grecaptcha.render('captcha', {
    'sitekey' : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    'theme' : 'light'
});
};

$(document).ready(function() {
    $("#refreshCaptcha").click(function(){
        console.log("Refresh button clicked")
        grecaptcha.reset();
    });
    
    $("#checkCaptcha").click(function() {
        console.info("Button was clicked");
        console.info(grecaptcha.getResponse(widgetId1));
        if(grecaptcha.getResponse(widgetId1) != ''){
            endTimeStamp = Date.now();
            timeTaken[webRoundCount] = endTimeStamp - startTimeStamp;
            console.log("timeTaken: " + timeTaken);
            console.log(webRoundCount);
            doNextRound();
            grecaptcha.reset();
        } else {
            timeTaken[webRoundCount] = "Failed";
            console.log("timeTaken: " + timeTaken);
            webFailCount++;
            doNextRound();
        }
        console.log("failCount:" + webFailCount);
        console.log("webRoundCount:" + webRoundCount);
    });
});

function doNextRound(){
    if (webRoundCount == 9) {
        $("#captcha").attr("disabled", true);
        $("#refreshCaptcha").attr("disabled", true);
        $("#checkCaptcha").attr("disabled", true);
        storeTestResultToFirebase(typeOfCaptcha, device, webFailCount, timeTaken);
    } else {
        $("#current-round").text(++webRoundCount + 1);
    }
    startTimeStamp = Date.now();
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