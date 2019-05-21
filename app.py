from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/main')
def main():
    return render_template('main.html')
    
@app.route('/googleCaptcha')
def googleCaptcha():
    return render_template('googleCaptcha.html')

if __name__ == '__main__':
    app.run()