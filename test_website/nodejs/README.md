# ec2 서버 설정
1. aws ec2 ubuntu 18.04 or 20.04
2. ssh -i ~ 를 사용해 인스턴스에 연결함.
3. node, npm 설치방법
#### for everyOS
    - $sudo apt update
    - $sudo apt install npm
    - $sudo apt install nodejs
    - $npm -v, nodejs -v  각각 3.5.2 , v8.10.0
    - $sudo apt install node-express-generator 
    - $express [생성할 폴더이름] --view=pug
    - $cd [생성할 폴더이름]
    - $vi ./bin/www
    - server 함수 내부에 console.log(app.get('port') + ' is running'); 추가
    - $npm start

#### for mac
#### * a. nvm 설치법 (이미 설치되어 있다면 생략) 
    - $brew install install
    - $mkdir ~/.nvm
    - $vi ~/.bash_profile
    - export NVM_DIR="$HOME/.nvm"
    - 밑의 내용을 맨 밑에 적고 :wq로 저장하고 나옴
    - $ source ~/.bash_profile
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
#### * b. nvm 사용 예시 
    - nvm install 10.10.0
    - nvm uninstall 10.10.0
    - nvm use 10.10.0

#### for linux
#### * a. curl 설치법 (이미 설치되어 있다면 생략) 
    - sudo apt-get install -y curl
    - sudo apt update
    - sudo apt install nodejs
    - nodejs -v
    - sudo apt install npm
#### * b. nvm 설치법 (이미 설치되어 있다면 생략) 
    - sudo apt-get install -y curl
    - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh
    - curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash 
    - source ~/.bashrc

4. Linux 포트포워딩
#### * 포트포워딩이란?
    −  포트 포워딩은 외부에서 접속한 IP 주소와 포트 번호를 내부 호스트에 다시 매핑하는 것을 말합니다.

#### * 외부 네트워크 80번 포트 -> 내부 네트워크 5005번 포트로 포트포워딩하는 예시
    −  sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5005

#### * 포트포워딩 확인
    −  sudo iptables -t nat -L --line-numbers

#### * 포트포워딩 삭제
    −  sudo iptables -t nat -D PREROUTING {삭제할 번호}

# 퍼블릭 IPv4 주소:3000 으로 접속이 안된다면?
##### 인바운드 규칙으로 들어가서 다음과 같이 처리
<img width="1076" alt="스크린샷 2022-04-12 오후 9 51 42" src="https://user-images.githubusercontent.com/54494793/162966738-bf69a374-2124-4011-bf97-14c9dd7febc2.png">


# 이미지 자동 새로고침 관련
#### https://ant.design/components/carousel/ 참고

# MongoDB에 대해
1. MongoDB Method
- LIMIT : 처음 데이터를 가져올때와 특정 버튼을 눌러서 데이터를 가져올때 얼마나 많은 데이터를 한번에 가져올지 정한다.
- SKIP : 어디서부터 데이터를 가져오는지 위치를 정한다. ex) 처음은 0부터 시작. limit이 6이라면 다음 번에는 2rd Skip = 0 + 6



### <이슈사항>

1.

![스크린샷 2022-04-13 오후 11 33 04](https://user-images.githubusercontent.com/54494793/163204446-47be6994-1ab6-4421-b27e-eb0ae45ed58a.png)
#### 로그인 화면에서 이메일과 패스워드를 입력한 후 로그인을 시도하면 다음과 같은 오류가 발생했음.

![스크린샷 2022-04-13 오후 10 16 20](https://user-images.githubusercontent.com/54494793/163204650-83c2d6c8-f98f-46f9-8c68-b6748c9e8392.png)

#### 이유는 server를 담당하는 express에서 package.json 파일안에 bcrypt 버전이 사용하는 nodejs 버전과 맞지 않아서였음.
#### dependencies 에서 버전을 수정하고 다시 npm install 후 오류를 해결함.


<img width="1108" alt="스크린샷 2022-04-23 오후 9 38 59" src="https://user-images.githubusercontent.com/54494793/164894935-2cc0adb5-6840-4989-9a7f-c89075bd90e3.png">
#### DB에 있는 모든 정보를 가져오려고 하는데 위와 같은 에러가 발생


2.

![image](https://user-images.githubusercontent.com/54494793/165223901-ac2ebb02-3d56-4f1a-afad-f618812c0e9f.png)
# linux 서버에 파일을 올려서 node를 실행하면 npm ERR! code ELIFECYCLE 에러가 발생함.
- $ npm cache clean --force
- $ rm -rf node_modules package-lock.json
- $ npm install
## 해결 : npm 캐시파일을 모두 삭제하고 package-lock 의존성을 제거한 후 npm을 재설치하면 됨



