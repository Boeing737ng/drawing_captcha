var pcCaptchaTimeGraph = document.getElementById('pc-time-graph').getContext('2d');
var pc_time_chart = new Chart(pcCaptchaTimeGraph, {
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
function addPCTimeGraphData(time, type) {
    if(type == 'Drawing') {
        pc_time_chart.data.datasets[0].data.push(time);
    } else if(type == 'Naver') {
        pc_time_chart.data.datasets[1].data.push(time);
    } else {
        pc_time_chart.data.datasets[2].data.push(time);
    }
    pc_time_chart.update();
}

var pcCaptchaFailGraphtx = document.getElementById('pc-fail-graph');
var pc_fail_chart = new Chart(pcCaptchaFailGraphtx, {
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
function addPCFailGraphData(fail, type) {
    if(type == 'Drawing') {
        pc_fail_chart.data.datasets[0].data.push(fail);
    } else if(type == 'Naver') {
        pc_fail_chart.data.datasets[1].data.push(fail);
    } else {
        pc_fail_chart.data.datasets[2].data.push(fail);
    }
    pc_fail_chart.update();
}

var pcCaptchaTimeAvg = document.getElementById('pc-avg-captcha-time');
var pc_avg_time = new Chart(pcCaptchaTimeAvg, {
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
function addPCTimeAvgGraph(time) {
    pc_avg_time.data.datasets[0].data.push(time);
    pc_avg_time.update();
}

var pcCaptchafailAvg = document.getElementById('pc-avg-captcha-fail');
var pc_avg_fail = new Chart(pcCaptchafailAvg, {
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
function addPCFailAvgGraph(time) {
    pc_avg_fail.data.datasets[0].data.push(time);
    pc_avg_fail.update();
}