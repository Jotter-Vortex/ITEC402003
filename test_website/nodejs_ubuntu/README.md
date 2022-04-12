# nodejs를 사용한 서버
1. aws ec2 ubuntu 18.04 서버를 하나 구축.
2. ssh -i ~ 를 사용해 인스턴스에 연결함
3. 
- $sudo apt update
- $sudo apt install npm
- $sudo apt install nodejs
- $npm -v, nodejs -v  각각 3.5.2 , v8.10.0
- $sudo apt install node-express-generator 
- $express [생성할 폴더이름] --view=pug
- $cd [생성할 폴더이름]
- $vi ./bin/www
- server 함수 내부에 console.log(app.get('port') + ' is running'); 추가
- 저장후에 $npm start

#### 퍼블릭 IPv4 주소:3000 으로 접속이 안된다면?
##### 인바운드 규칙으로 들어가서 다음과 같이 처리하면 됨


## 팀원
| 이름 | 역할 | 학년 | 학번 | 깃허브 아이디 |
| ------ | ------ | ------ | ------ | ------ |
| 이창진 | 팀장 | 4학년 | 2016116317 | Jotter-Vortex |
| 이상민 | 팀원 | 4학년 | 2017116887 | SM922 |
| 박건우 | 팀원 | 4학년 | 2017116801 | qkrrjsdn |