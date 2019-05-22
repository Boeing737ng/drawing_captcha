var device = "undefined";

$(document).ready(function () {
    $("#backward").click(
        function () {
            window.location.href = "./";
        }
    );
    $("#test_backward").click(
        function () {
            window.location.href = "main";
        }
    );
    $('#signup-btn').click(
        function () {
            window.location.href = "signup";
        }
    );
    $('#start-captcha-btn').click(
        function () {
            $('#start-captcha-btn').hide();
            $('#loading-text').show();
            start();
        }
    );
    $('#new-word').click(
        function () {
            erase();
            displayMissionWord();
        }
    );
    $('#re-draw').click(
        function () {
            erase();
        }
    );
    $('#signin-btn').click(
        function () {
            signIn();
        }
    );
    $('#confirm-signup').click(
        function () {
            signUp();
        }
    );
    $('#logout').click(
        function () {
            signOut();
        }
    );
    $('#option-drawing').click(
        function () {
            window.location.href = "drawingCaptcha";
        }
    );
    $('#option-naver').click(
        function () {
            window.location.href = "captchaNaver";
        }
    );
});

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
