# [여행상품 쇼핑몰](http://testwebsiteteam2.shop/)
### * Public IP : [3.37.62.142](http://3.37.62.142/)
### * Front-End : [React](https://ko.reactjs.org/docs/getting-started.html), [Redux](https://ko.redux.js.org/introduction/getting-started)
### * Back-End : [Express](https://expressjs.com/ko/), [MongoDB](https://www.mongodb.com/ko-kr)
### * 오픈소스 : [Redux](https://ko.redux.js.org/introduction/getting-started), [multer](https://www.npmjs.com/package/multer), [drop-zone](https://www.npmjs.com/package/dropzone), [react-gallery-carousel](https://www.npmjs.com/package/react-gallery-carousel), [react-paypal-express-checkout](https://www.npmjs.com/package/react-paypal-express-checkout), [async](https://www.npmjs.com/package/async)
### * [paypal 추가하기](https://developer.paypal.com/developer/accounts)

</br>
</br>

# ec2 서버 설정
## 1. OS : aws ec2 ubuntu 18.04 or 20.04
## 2. ssh -i ~ 를 사용해 인스턴스에 연결합니다.. (aws 연결 탭 참조)
## 3. 서버에 올릴 때 수정해야 할 파일들입니다 .. => (setupProxy.js, UserBlock.js, ProductImage.js, ImageSlider.js, FileUpload.js  )
## 4. node, npm 사용예시
    #### * nvm
        $ nvm install 10.10.0
        $ nvm uninstall 10.10.0
        $ nvm use 10.10.0

    #### * node
        $ node install opensource --save 
        $ node start
        $ node install
        $ node run
        $ node test

</br>

## 4. node, npm 설치법

    a. For everyOS
        - $sudo apt update
        - $sudo apt install npm
        - $sudo apt install nodejs

    b. For mac
      * a. nvm 설치법
        - $brew install install
        - $mkdir ~/.nvm
        - $vi ~/.bash_profile
        - export NVM_DIR="$HOME/.nvm"
        - 밑의 내용을 맨 밑에 적고 :wq로 저장하고 나오기
        - $ source ~/.bash_profile
    [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
    [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  #    This loads nvm bash_completion


    c. For linux
      * a. curl 설치법
        - sudo apt-get install -y curl
        - sudo apt update
        - sudo apt install nodejs
        - nodejs -v
        - sudo apt install npm
      * b. nvm 설치법
        - sudo apt-get install -y curl
        - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh
        - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash 
        - source ~/.bashrc

    d. For windows
      * curl을 통한 방법 : linux와 동일
      * nodejs 홈페이지에서 msi 파일로 다운로드 하는 방법 : https://nodejs.org/en/

## 5. Linux 포트포워딩
      * 포트포워딩이란?
        −  포트 포워딩은 외부에서 접속한 IP 주소와 포트 번호를 내부 호스트에 다시 매핑하는 것을 말합니다.

      * 외부 네트워크 80번 포트 -> 내부 네트워크 5005번 포트로 포트포워딩하는 예시
        −  sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5005

      * 포트포워딩 확인
        −  sudo iptables -t nat -L --line-numbers

      * 포트포워딩 삭제
        −  sudo iptables -t nat -D PREROUTING {삭제할 번호}

</br>
</br>

# 오픈소스 정리

### 1. 이미지 자동 새로고침 관련
#### https://ant.design/components/carousel/ 참고

</br>

### 2. 이미지 DetailPage에서 썸네일을 만들고 싶다면?
#### gm npm 모듈을 사용하면 됨. https://www.npmjs.com/package/gm

</br>


### 3. 이미지를 띄울때 쓰기 좋은 모듈
#### npm install react-image-gallery https://www.npmjs.com/package/react-image-gallery
#### 만약 액자 안에서 동작하지 않으면 css를 추가해주면 됨. 
    #CSS
    @import "~react-image-gallery/styles/css/image-gallery.css";
#### 위 내용을 index.css의 맨 윗줄에 넣을 것.

</br>

### 4. Redux
** Redux DevTools - 크롬에서 리덕스를 편하게 사용하는 툴
1. Redux is a predictable state container for JavaScript apps. (번역) 상태 관리 라이브러리 2번의 State을 관리해주는 툴이다.

<div align="center">
<img src="https://user-images.githubusercontent.com/54494793/167301014-8d2a9435-c187-4a44-a975-60cfab2690cf.png" width="65%" height="65%" style="border-radius:5%;">
</div>

2. Props VS State
    ##### Props : Components간의 정보 이동. 방향은 위에서 아래로만 가능. 부모 component에서 내려준 값은 자식 component에서 변경이 불가능함.
     - ex) `<ChatMessages`
     - `messages = {messages}`
     - `currentMember = {member} `
     - `/>`    
    ##### State : component 안에서 값을 사용할 때. State의 값은 계속 변할 수 있음.
     - ex) `state = {`
     - `messages : '',`
     - `attachFile : undefuned, `
     - `openMenu : false,`
     - `};`    

</br>

<div align="center">
<img src="https://user-images.githubusercontent.com/54494793/167300964-e25b733f-eb4b-4cfd-864c-d243ac4cb7c4.png" width="55%" height="55%" style="border-radius:5%;">
</div>

3. Redux data Flow (strict unidirectional data flow)
    #### A. Action : a plain object describing what happended.
     - `{type: 'LIKE_ARTICLE', articleId: 42}`
     - `{type: 'FETCH_USER_SUCCESS', response: {id:3, name:'Mary'}}`
     - `{type: 'ADD_TODO', text: 'Read the Redux docs.'}`

     #### B. Reducer : a function describing how the application's state changes
      - `(previousState, action) => nextState`
      - action을 함으로 인해서 원래 3이었던 state가 action을 통해서 4로 변했다.라는 식. 결국 nextState를 리턴하는 것이 핵심.

      #### C. Store : 여러가지 많은 methos가 있음. 이걸로 state를 관리함. 

</br>

4. 설치
    #### 설치 명령어
        −  $ npm install redux react-redux redux-promise redux-thunk
    #### index.js 맨 윗줄에 추가.
    `import { Provider } from 'react-redux'`;

    `<Provider>`
    
    `<App />`

    `</Provider>`
    #### 1. redux 
    #### 2. react-redux 
    #### 3. redux-promise 
    #### 4. redux-thunk
    #### redux-promise, redux-thunk 
        이 둘은 middleware임 {} 같은 객체 형식의 Action아닌 Promise, Functions 형식으로 Action이 왔을 때 적절하게 해결하는 역할을 함.





</br>
</br>

# MongoDB에 대해
1. MongoDB Method
- LIMIT : 처음 데이터를 가져올때와 특정 버튼을 눌러서 데이터를 가져올때 얼마나 많은 데이터를 한번에 가져올지 정한다.
- SKIP : 어디서부터 데이터를 가져오는지 위치를 정한다. ex) 처음은 0부터 시작. limit이 6이라면 다음 번에는 2rd Skip = 0 + 6

</br>
</br>


# <이슈사항>

## 1. ECONNREFUSED 에러

<div align="center">
<img src="https://user-images.githubusercontent.com/54494793/163204446-47be6994-1ab6-4421-b27e-eb0ae45ed58a.png" width="45%" height="45%" style="border-radius:5%;">
</div>

#### 로그인 화면에서 이메일과 패스워드를 입력한 후 로그인을 시도하면 다음과 같은 오류가 발생했습니다.

<div align="center">
<img src="https://user-images.githubusercontent.com/54494793/163204650-83c2d6c8-f98f-46f9-8c68-b6748c9e8392.png" width="65%" height="65%" style="border-radius:5%;">
</div>

#### 이유는 server를 담당하는 express에서 package.json 파일안에 bcrypt 버전이 사용하는 nodejs 버전과 맞지 않아서 였습니다.
#### dependencies 에서 버전을 수정하고 다시 npm install 후 오류를 해결했습니다.

</br>


<div align="center">
<img src="https://user-images.githubusercontent.com/54494793/164894935-2cc0adb5-6840-4989-9a7f-c89075bd90e3.png" width="55%" height="55%" style="border-radius:5%;">
</div>

#### DB에 있는 모든 정보를 가져오려고 하는데 위와 같은 에러가 발생했습니다.

</br>

## 2. npm ERR! code ELIFECYCLE 에러

<div align="center">
<img src="https://user-images.githubusercontent.com/54494793/165223901-ac2ebb02-3d56-4f1a-afad-f618812c0e9f.png" width="55%" height="55%" style="border-radius:5%;">
</div>

### linux 서버에 파일을 올려서 node를 실행하면 npm ERR! code ELIFECYCLE 에러가 발생함.
    - $ npm cache clean --force
    - $ rm -rf node_modules package-lock.json
    - $ npm install
### 해결 : npm 캐시파일을 모두 삭제하고 package-lock 의존성을 제거한 후 npm을 재설치하면 됨

</br>


## 3. Error: listen EADDRINUSE: address already in use :::5000 에러
    - $ netstat -ano 혹은 $ sudo lsof -i :5000
    - 5000번 포트를 사용하는 프로세스의 ID 확인
    - 해당 프로세스 강제종료하기

</br>

## 4. POST 400 (Bad Request) , in promise Error: Request failed with status code 400
    - proxy 서버의 middleware 관련 문제였음. 
    - setupProxy.js 파일의 내용을 변경해 해결함.
    
   <div align="center">
    <img src="https://user-images.githubusercontent.com/54494793/168082659-893079dd-b91a-4b9d-9dbb-65c4a9eb7cfb.png" width="55%" height="55%" style="border-radius:5%;">
    </div>


</br>

## 퍼블릭 IPv4 주소:3000 으로 접속이 안된다면?
##### 인바운드 규칙으로 들어가서 다음과 같이 처리

<div align="center">
<img src="https://user-images.githubusercontent.com/54494793/162966738-bf69a374-2124-4011-bf97-14c9dd7febc2.png" width="65%" height="65%" style="border-radius:5%;">
</div>
