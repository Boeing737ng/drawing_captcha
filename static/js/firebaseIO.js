
var len=0;

function storeCurrentTestResultToFirebase(captchaType,device, failCount,timeTaken, curCount) {
    var db = firebase.database();
    var ref = db.ref('users/' + getConvertedUserEmail(getSignInEmail()) +'/type/'+captchaType +'/device/' + device);
    ref.update({
        "failCount": failCount
    }).then(function(){
        if(curCount == len) {
            alert("메인으로 돌아갑니다.");
            window.location.href = "main"
        }else{
            console.log("cur len:"+len);
        }
    });
    if (timeTaken != "Failed") {
        var timeREF = ref.child("time");
        var newTime = timeREF.push();
        newTime.set(timeTaken);
    }
}
function storeTestResultToFirebase(captchaType,device, failCount, timeTakenArray) {
    // console.log(timeTakenArray);
    len=timeTakenArray.length;
    var curCount=1;
    console.log(timeTakenArray.length);
    timeTakenArray.forEach(function(timeTaken){
        // console.log(device, failCount, timeTaken);
        storeCurrentTestResultToFirebase(captchaType, device, failCount,timeTaken, curCount++ );
    });  
}

// function getCurrentTestResultToFirebase(device, email) {
//     var db = firebase.database();
//     var ref = db.ref('users/' + getConvertedUserEmail(email) + '/device/' + device);
//     var data = {};
//     ref.on("value", function (snapshot) {
//         // console.log(snapshot.val());
//         data = snapshot.val();
//         console.log(data);
//         return data;
//     }, function (error) {
//         console.log("Error: " + error.code);
//         return data;
//     });
// }

function getConvertedUserEmail(email) {
    var initialID = email;
    var result = '';
    var pos = initialID.indexOf(".");
    result = initialID.replaceAt(pos, "_");
    // alert(result);
    return result;
}

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture: imageUrl
    });
}
String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}