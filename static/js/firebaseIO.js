
var len=0;

function storeCurrentTestResultToFirebase(captchaType,device, failCount,timeTaken, curCount) {
    var db = firebase.database();
    var ref = db.ref('users/' + getConvertedUserEmail(getSignInEmail()) +'/type/'+captchaType +'/device/' + device);
    ref.update({
        "failCount": failCount
    }).then(function(){
        if(curCount == len) {
            if(device == "PC") {
                console.log("PC");
                updateDeviceCount("PC");
            } else {
                updateDeviceCount("mobile");
            }
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
function updateDeviceCount(device) {
    var deviceCount;
    var deviceRef = firebase.database().ref('deviceCount/' + device + '/count/');
    var updateRef = firebase.database().ref('deviceCount/' + device);
    deviceRef.once('value', function(count) {
        console.log(count.val());
        deviceCount = count.val() + 1;
        console.log(deviceCount);
    }).then(function() {
        updateRef.update({
            'count': deviceCount
        })
        alert("메인으로 돌아갑니다.");
        window.location.href = "main"
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