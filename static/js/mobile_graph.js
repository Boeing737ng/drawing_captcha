
var mobileCaptchaTimeGraph = document.getElementById('mobile-time-graph').getContext('2d');
var mobile_time_chart = new Chart(mobileCaptchaTimeGraph, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Drawing Captcha',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0)'
            ],
            borderColor: [
                'rgba(92, 209, 229, 1)'
            ],
            borderWidth: 2
        },{
            label: 'Naver Captcha',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0)'
            ],
            borderColor: [
                'rgba(29, 219, 22, 1)'
            ],
            borderWidth: 2
        },{
            label: 'Google reCaptcha v2',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0)'
            ],
            borderColor: [
                'rgba(166, 166, 166, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
function addMobileTimeGraphData(time, type) {
    if(type == 'Drawing') {
        mobile_time_chart.data.datasets[0].data.push(time);
    } else if(type == 'Naver') {
        mobile_time_chart.data.datasets[1].data.push(time);
    } else {
        mobile_time_chart.data.datasets[2].data.push(time);
    }
    mobile_time_chart.update();
}

var mobileCaptchaFailGraphtx = document.getElementById('mobile-fail-graph');
var mobile_fail_chart = new Chart(mobileCaptchaFailGraphtx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Drawing',
            data: [],
            backgroundColor: 'rgba(92, 209, 229, 0.2)',
            borderColor: 'rgba(92, 209, 229, 1)',
            borderWidth: 1
        }, {
            label: 'Naver',
            data: [],
            backgroundColor:'rgba(29, 219, 22, 0.2)',
            borderColor: 'rgba(29, 219, 22, 1)',
            borderWidth: 1
        }, {
            label: 'Google',
            data: [],
            backgroundColor: 'rgba(166, 166, 166, 0.2)',
            borderColor: 'rgba(166, 166, 166, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
function addMobileFailGraphData(fail, type) {
    if(type == 'Drawing') {
        mobile_fail_chart.data.datasets[0].data.push(fail);
    } else if(type == 'Naver') {
        mobile_fail_chart.data.datasets[1].data.push(fail);
    } else {
        mobile_fail_chart.data.datasets[2].data.push(fail);
    }
    mobile_fail_chart.update();
}

var mobileCaptchaTimeAvg = document.getElementById('mobile-avg-captcha-time');
var mobile_avg_time = new Chart(mobileCaptchaTimeAvg, {
    type: 'bar',
    data: {
        labels: ['Drawing Captcha', 'Naver Captcha', 'Google Captcha'],
        datasets: [{
            label: [],
            data: [],
            backgroundColor: [
                'rgba(92, 209, 229, 0.2)',
                'rgba(29, 219, 22, 0.2)',
                'rgba(166, 166, 166, 0.2)'
            ],
            borderColor: [
                'rgba(92, 209, 229, 1)',
                'rgba(29, 219, 22, 1)',
                'rgba(166, 166, 166, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
function addMobileTimeAvgGraph(time) {
    mobile_avg_time.data.datasets[0].data.push(time);
    mobile_avg_time.update();
}

var mobileCaptchafailAvg = document.getElementById('mobile-avg-captcha-fail');
var mobile_avg_fail = new Chart(mobileCaptchafailAvg, {
    type: 'bar',
    data: {
        labels: ['Drawing Captcha', 'Naver Captcha', 'Google Captcha'],
        datasets: [{
            label: [],
            data: [],
            backgroundColor: [
                'rgba(92, 209, 229, 0.2)',
                'rgba(29, 219, 22, 0.2)',
                'rgba(166, 166, 166, 0.2)'
            ],
            borderColor: [
                'rgba(92, 209, 229, 1)',
                'rgba(29, 219, 22, 1)',
                'rgba(166, 166, 166, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
function addMobileFailAvgGraph(time) {
    mobile_avg_fail.data.datasets[0].data.push(time);
    mobile_avg_fail.update();
}