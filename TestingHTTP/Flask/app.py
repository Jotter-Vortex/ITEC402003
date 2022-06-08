from bson import ObjectId
from flask import Flask, render_template, jsonify, request, sessions
from pymongo import MongoClient
from flask_mail import Mail, Message

app = Flask(__name__)
MONGODB_ID = "ID"
MONGODB_PASS_WORD = "PASS_WORD"
IP_ADRESS = "IP_ADDRESS"

client = MongoClient('mongodb://'+MONGODB_ID+':'+MONGODB_PASS_WORD+'@'+IP_ADRESS, 27017)       
db = client.knutesting          

## 이메일기능을 담당하는 부분 오류가 나도록 유도함.
mail = Mail(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'Johndoe@gmail.com'
app.config['MAIL_PASSWORD'] = 'Johndoeisalive'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)                  


############################## main #############################

## HTML을 주는 부분
@app.route('/')
def home():
   return render_template('index.html')
   

############################## knu_upload #############################

@app.route('/knu_upload')
def knu_upload():
   return render_template('knu_upload.html')

### GET 요청으로 클라이언트에 값을 보내겠다.
@app.route('/knu_upload/write', methods=['GET'])
def show_board():
    writings = list(db.board.find({}))
    for i in range(len(writings)):
        writings[i]['_id'] = str(writings[i]['_id'])
    return jsonify({'result': 'success', 'all_writing': writings})

@app.route('/knu_upload/write', methods=['POST'])       # writing 주소
def board_write():
    title_receive = request.form['title_give']
    content_receive = request.form['content_give']
    file = request.files["file_give"]

    extension = file.filename.split('.')[-1]

    #### 시간을 나누는 방법. 년. 월. 일. 시. 분. 초. 로 나눔
    today = datetime.now()
    mytime = today.strftime('%Y년 %m월 %d일 %H시 %M분 %S초')
    cardtime = today.strftime('%Y.%m.%d %H:%M')
    filename = f'file--{mytime}'
    save_to = f'static/uploadfile/{filename}.{extension}'
    file.save(save_to)
    doc = {
        'title': title_receive,
        'content': content_receive,
        'file': f'{filename}.{extension}',
        'time': cardtime
    }
    db.board.insert_one(doc)
    return jsonify({'msg': '저장 완료!'})

############################## knu_post #############################

@app.route('/knu_post')
def knu_post():
   return render_template('knu_post.html')

############################## knu_contact #############################

@app.route('/knu_contact')
def knu_contact():
   return render_template('knu_contact.html')

   ## email
@app.route('/contact_email', methods=['POST'])
def contact_email() :
    # 1. 클라이언트로부터 데이터를 받기
    uname = request.form['name']  # 클라이언트로부터 name을 받을 부분
    uemail = request.form['email']  # 클라이언트로부터 email을  받을 부분
    uphone = request.form['phone']  # 클라이언트로부터 phone를 받을 부분
    umessage = request.form['message']  # 클라이언트로부터 message를  받을 부분
    emailbody="이름 : "+uname+"\n이메일 : "+uemail+"\n폰번호 : "+uphone+"\n메시지 : "+umessage
    print(emailbody)
    msg = Message('knu_test_web_site', sender='JhonDoe@gmail.com', recipients=['JhonDoe@gmail.com'])
    msg.body = emailbody
    mail.send(msg)
    return jsonify({'result': 'success'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
