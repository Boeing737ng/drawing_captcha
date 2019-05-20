from flask import Flask, render_template, jsonify, request
import os, ssl, calendar, time, sys, urllib.request, json
import static.python.naverCaptchaKey as NAVER_CAPTCHA_KEY

if (not os.environ.get('PYTHONHTTPSVERIFY', '') and
    getattr(ssl, '_create_unverified_context', None)): 
    ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/captchaNaver')
def captchaNaver():
    return render_template('captchaNaver.html')

@app.route('/captchaNaverGetKey', methods=['POST'])
def captchaNaverGetKey():
    client_id = NAVER_CAPTCHA_KEY.get_client_id()
    client_secret = NAVER_CAPTCHA_KEY.get_client_secret()
    code = "0"
    url = "https://openapi.naver.com/v1/captcha/nkey?code=" + code
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    # response.headers['Access-Control-Allow-Origin'] = '*'
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        print("Get Key: "+response_body.decode('utf-8'))
        # print("->Key: "+response.key)
    else:
        print("Error Code:" + rescode)
    
    return response_body.decode('utf-8')

@app.route('/captchaNaverGetImage', methods=['POST'])
def captchaNaverGetImage():
    client_id = NAVER_CAPTCHA_KEY.get_client_id()
    client_secret = NAVER_CAPTCHA_KEY.get_client_secret()
    key = request.form['key']
    
    print("key:"+key)
    print("client_id:"+client_id)
    print("client_secret:"+client_secret)
    
    url = "https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=" + key
    req = urllib.request.Request(url)
    req.add_header("X-Naver-Client-Id",client_id)
    req.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(req)
    rescode = response.getcode()
    if(rescode==200):
        print("캡차 이미지 저장")
        response_body = response.read()
        ts = calendar.timegm(time.gmtime())
        fileName="static/captchaImage/captcha"+str(ts)+".jpg"
        with open(fileName, 'wb') as f:
            f.write(response_body)
            print("image src : "+fileName)
    else:
        print("Error Code:" + rescode)
    return jsonify(fileLoc=fileName)

@app.route('/captchaNaverValidationCheck', methods=['POST'])
def captchaNaverValidationCheck():
    client_id = NAVER_CAPTCHA_KEY.get_client_id()
    client_secret = NAVER_CAPTCHA_KEY.get_client_secret()

    code = "1"
    key = key = request.form['key']
    value = request.form['userInput']
    print("key:"+key)
    print("value:"+value)
    print("client_id:"+client_id)
    print("client_secret:"+client_secret)
    url = "https://openapi.naver.com/v1/captcha/nkey?code=" + code + "&key=" + key + "&value=" + value
    req = urllib.request.Request(url)
    req.add_header("X-Naver-Client-Id",client_id)
    req.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(req)
    rescode = response.getcode()
    if(rescode==200):
        response_body = response.read()
        print(response_body.decode('utf-8'))
    else:
        print("Error Code:" + rescode)
    return response_body.decode('utf-8')


if __name__ == '__main__':
    app.run()