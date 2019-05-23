function signIn() {
    var email = getLoginEmail();
    var password = getLoginPassword();
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (success) {
            if(email == "admin@admin.com") {
                window.location.href = "admin";
            } else {
                window.location.href = "main";
            }
        })
        .catch(function (error) {
            // Handle Errors.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}
function signUp() {
    var email = getEmail();
    var pwd = getPassword();
    var pwd_check = getPasswordCheck();
    if(pwd != pwd_check) {
        alert('비밀번호를 확인하세요.');
        return;
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
        .then(function (success) {
            console.log(email + "님 가입 완료");
            if(confirm('바로 로그인 하시겠습니까?')) {
                window.location.href = "main";
            } else {
                window.location.href = "./";
            }
        })
        .catch(function (error) {
            // Handle Errors.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }
}
function signOut() {
    if(confirm('로그아웃 하시겠습니까?')){
        firebase.auth().signOut()
            .then(function (success) {
                window.location.href = "/";
                console.log('로그아웃 완료');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

}
function getLoginEmail() {
    return $("#login-email").val();
}
function getLoginPassword() {
    return $("#login-pwd").val();
}
function getEmail() {
    return $("#user-signup-email").val();
}
function getPassword() {
    return $("#user-signup-pwd").val();
}
function getPasswordCheck() {
    return $("#pwd-check").val();
}