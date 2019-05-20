$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/captchaNaverGetKey",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $("#key").val(data.key);
            console.log($("#key").val());
            var sendKey =
            {
                key: $("#key").val()
            }
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:5000/captchaNaverGetImage",
                data: sendKey,
                dataType: "json",
                success: function (result) {
                    console.log(result.fileLoc);
                    $(".naver-captcha-image").empty();
                    $(".naver-captcha-image").html("<img src='" + result.fileLoc + "'>");
                }
            });
        }
    });

    $("#btnNextCaptcha").click(function () {
        $("#value").val("");
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/captchaNaverGetKey",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $("#key").val(data.key);
                console.log($("#key").val());
                var sendKey =
                {
                    key: $("#key").val()
                }
                $.ajax({
                    type: "POST",
                    url: "http://127.0.0.1:5000/captchaNaverGetImage",
                    data: sendKey,
                    dataType: "json",
                    success: function (result) {
                        console.log(result.fileLoc);
                        $(".naver-captcha-image").empty();
                        $(".naver-captcha-image").html("<img src='" + result.fileLoc + "'>");
                    }
                });
            }
        });
    });
    $("#btnSendValidationCheck").click(function () {
        console.log($("#key").val());
        var sendData =
        {
            key: $("#key").val(),
            userInput: $("#value").val()
        }
        var checkFlag = true;
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:5000/captchaNaverValidationCheck",
            data: sendData,
            dataType: "json",
            success: function (data) {
                console.log(data);
                if(data.result==true){
                    $("#btnSendValidationCheck").attr("disabled",true);
                    $("#btnNextCaptcha").attr("disabled",true);
                }
            }
        });
    });

});
