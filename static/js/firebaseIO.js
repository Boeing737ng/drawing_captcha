
var len=0;
var userList = [];
var deviceArray = ["PC", "mobile"];

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

function getDeviceCountFromDB() {
    firebase.database().ref('deviceCount/PC/count/').once('value', function(count) {
        document.getElementById('browser-count').textContent = count.val();
    }).then(function() {
        firebase.database().ref('deviceCount/mobile/count/').once('value', function(count) {
            document.getElementById('mobile-count').textContent = count.val();
        })
    });
}

function getCaptchaData() {
    firebase.database().ref('users/').once('value', function(userListFromDB) {
        userList = Object.keys(userListFromDB.val());
        //console.log(snapshot.val());
        userListFromDB.forEach((user) => {
            //console.log(child.key)
            var id = user.key.substring(0, user.key.lastIndexOf("@"));
            pc_time_chart.data.labels.push(id);
            pc_fail_chart.data.labels.push(id);
            mobile_time_chart.data.labels.push(id);
            mobile_fail_chart.data.labels.push(id);
            pc_time_chart.update();
            pc_fail_chart.update();
            mobile_time_chart.update();
            mobile_fail_chart.update();
            firebase.database().ref('users/' + user.key + '/type').once('value', function(type) {
                type.forEach((data) => {
                    getUserUserTestData(user.key, data.key);
                })
            })
        })
    });
}

function getUserUserTestData(user, type) {
    firebase.database().ref('users/' + user + '/type/' + type + '/device/PC').once('value', function(data) {
        setJsonData(user, type, data, 'PC');
    }).then(function() {
        firebase.database().ref('users/' + user + '/type/' + type + '/device/mobile').once('value', function(data) {
            setJsonData(user, type, data, 'mobile');
        })
    });
}

function setJsonData(email, type, data, device) {
    var avgTime = 0;
    if(data.val() != null) {
        var failCount = data.val().failCount;
        if(failCount != 10) {
            var totalTime = 0;
            var timeCount = 0;
            for(key in data.val().time) {
                totalTime += data.val().time[key];
                timeCount++;
            }
            avgTime = Math.trunc(totalTime / timeCount);
        }
        if(type == 'drawing') {
            createDrawingJson(avgTime, failCount, device);
        } else if(type == 'naver') {
            createNaverJson(avgTime, failCount, device);
        } else {
            createGoogleJson(avgTime, failCount, device);
        }
    }
}

function createDrawingJson(time, failCount, device) {
    if(device == 'PC') {
        addPCTimeGraphData(time, 'Drawing');
        addPCFailGraphData(failCount, 'Drawing');
    } else {
        addMobileTimeGraphData(time, 'Drawing');
        addMobileFailGraphData(failCount, 'Drawing');
    }
}

function createNaverJson(time, failCount, device) {
    if(device == 'PC') {
        addPCTimeGraphData(time, 'Naver');
        addPCFailGraphData(failCount, 'Naver');
    } else {
        addMobileTimeGraphData(time, 'Naver');
        addMobileFailGraphData(failCount, 'Naver');
    }
}

function createGoogleJson(time, failCount, device) {
    if(device == 'PC') {
        addPCTimeGraphData(time, 'Google');
        addPCFailGraphData(failCount, 'Google');
    } else {
        addMobileTimeGraphData(time, 'Google');
        addMobileFailGraphData(failCount, 'Google');
    }
}

function run() {
    showLoading();
    getCaptchaData();
    setTimeout(
        function() {
            hideLoading();
        }, 5000);
}
run();