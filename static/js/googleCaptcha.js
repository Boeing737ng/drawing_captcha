var checked = false;
var startTimeStamp = 0;
var webRoundCount = 0;
var webFailCount = 0;
var endTimeStamp = 0;
var timeTaken = [];

var verifyCallback = function(response) {
    alert(response);
};

var widgetId1;
var widgetId2;
var onloadCallback = function() {
// Renders the HTML element with id 'example1' as a reCAPTCHA widget.
// The id of the reCAPTCHA widget is assigned to 'widgetId1'.
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
    if (webRoundCount == 50) {
        $("#captcha").attr("disabled", true);
        $("#refreshCaptcha").attr("disabled", true);
        $("#checkCaptcha").attr("disabled", true);
    } else {
        $("#current-round").text(++webRoundCount);
    }
    startTimeStamp = Date.now();
}