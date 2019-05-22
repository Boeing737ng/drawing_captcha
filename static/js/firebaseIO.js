
function storeCurrentTestResultToFirebase(device, failCount,timeTaken,len) {
    var db = firebase.database();
    var ref = db.ref('users/' + getConvertedUserEmail(getSignInEmail()) + '/device/' + device);
    ref.update({
        "failCount": failCount
    }).then(function(){
        if(len == 4) {
            alert("메인으로 돌아갑니다.");
            window.location.href = "main"
        }
    });
    if (timeTaken != "Failed") {
        var timeREF = ref.child("time");
        var newTime = timeREF.push();
        newTime.set(timeTaken);
    }
}
function storeTestResultToFirebase(device, failCount, timeTakenArray) {
    // console.log(timeTakenArray);
    timeTakenArray.forEach(function(timeTaken){
        // console.log(device, failCount, timeTaken);
        storeCurrentTestResultToFirebase(device, failCount,timeTaken, timeTakenArray.length);
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