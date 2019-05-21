$(document).ready(function() {
    $("#backward").click(
        function() {
            window.location.href = "./";
        }
    );
    $('#signup-btn').click(
        function() {
            window.location.href = "signup";
        }
    );
    $('#start-captcha-btn').click(
        function() {
            $('#start-captcha-btn').hide();
            $('#loading-text').show();
            start();
        }   
    );
    $('#new-word').click(
        function() {
            erase();
            displayMissionWord();
        }
    );
    $('#re-draw').click(
        function() {
            erase();
        }   
    );
});